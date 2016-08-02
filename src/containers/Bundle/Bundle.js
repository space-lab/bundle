import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { BundleSelectors, UserSelectors, LinkSelectors, CollectionSelectors } from 'selectors'
import { AlertActions, BundleActions, CollectionActions, LinkActions, UserActions,
  ShareActions, SearchActions } from 'actions'
import { Content, Header, Bundle, Editable, AddLink, Link, Permission, Toolbar, ChangeCollection, JoinBundle, LeaveBundle, ShareBundle } from 'components'

let connectState = state => ({
  bundle: BundleSelectors.current(state),
  bundleId: BundleSelectors.currentId(state),
  links: LinkSelectors.all(state),
  currentLink: LinkSelectors.current(state),
  users: UserSelectors.all(state),
  currentUser: UserSelectors.current(state),
  userAutocomplete: UserSelectors.autocompletes(state),
  collections: CollectionSelectors.all(state),
  receivedAllCollections: CollectionSelectors.receivedAll(state)
})

let connectProps = {
  ...AlertActions,
  ...BundleActions,
  ...CollectionActions,
  ...LinkActions,
  ...UserActions,
  ...ShareActions,
  ...SearchActions
}

let enhancer = connect(connectState, connectProps)

class BundleContainer extends React.Component {
  componentWillMount () {
    let { bundle, getBundle, bundleId, receivedAllCollections, getCollections } = this.props

    this.handleUpdate = debounce(this.handleUpdate, 1000)

    if (bundleId && !bundle) getBundle(bundleId)
    if (!receivedAllCollections) getCollections()
  }

  componentWillReceiveProps ({ bundle: nextBundle, bundleId: nextBundleId }) {
    let { getBundle, bundleId } = this.props
    if (bundleId !== nextBundleId && !nextBundle) getBundle(nextBundleId)
  }

  handleUpdate (payload) {
    this.props.updateBundle(this.props.bundleId, payload)
  }

  handleLinkRemove (link, event) {
    if (confirm('are you sure?')) this.props.removeLink(link.id, this.props.bundle.id)
    event.preventDefault()
  }

  handleLinkComplete (link, event) {
    this.props.toggleCompleteLink(link.id)
    event.preventDefault()
  }

  render () {
    let props = this.props
    let currentUserId = props.currentUser.id

    if (!props.bundle) return false

    return <Content>
      <Header>
        <ChangeCollection
          bundle={props.bundle}
          collections={props.collections}
          canChangeCollection={props.bundle.canChangeCollection(currentUserId)}
          updateBundle={props.updateBundle} />

        <div className='align-right'>
          <Permission allow={!props.bundle.joined}>
            <JoinBundle
              bundle={props.bundle}
              currentUserId={currentUserId}
              joinUrlShare={props.joinUrlShare}
              addAlert={props.addAlert} />
          </Permission>

          <Permission allow={props.bundle.canLeave(currentUserId)}>
            <LeaveBundle
              bundleId={props.bundle.id}
              shareId={props.bundle.shareIdFor(currentUserId)}
              leaveShare={props.leaveShare}
              addAlert={props.addAlert} />
          </Permission>

          <Permission allow={props.bundle.canShare(currentUserId)}>
            <ShareBundle
              {...this.props} // TODO big no no no
              shareModal={props.shareModal}
              updateShareModal={props.updateShareModal}
              resourceName='Bundle'
              resource={props.bundle} />
          </Permission>
        </div>
      </Header>

      <Bundle>
        <Editable
          className='bundle-name'
          value={props.bundle.name || ''}
          editMode={props.bundle.canEdit(props.currentUser.id)}
          placeholder='Name goes here...'
          onChange={value => this.handleUpdate({ name: value })} />

        <Editable
          type='textarea-autosize'
          className='bundle-description'
          value={props.bundle.description || ''}
          editMode={props.bundle.canEdit(props.currentUser.id)}
          placeholder='Description goes here...'
          onChange={value => this.handleUpdate({ description: value })} />

        <Permission allow={props.bundle.canEdit(props.currentUser.id)}>
          <AddLink
            bundle={props.bundle}
            user={props.currentUser}
            link={props.currentLink}
            handleUrlEnter={url => props.fetchLink(url, props.bundle.id)}
            handleLinkAdd={link => props.addLink(link, props.bundle.id)}
            handleLinkRemove={() => props.clearCurrentLink(props.bundle.id)} />
        </Permission>

        {props.bundle.get('links').map(id => {
          let link = props.links.get(id)
          let user = props.users.get(link.creator)
          let completedClass = 'link-complete' + (link.completed ? ' completed' : '')

          return <Link key={link.id}
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            createdAt={link.created_at}
            completed={link.completed}
            creatorName={user.name}
            creatorImage={user.image}>
            <Toolbar>
              <Permission allow>
                <div className={completedClass} onClick={this.handleLinkComplete.bind(this, link)} />
              </Permission>

              <Permission allow={link.canRemove(props.currentUser.id)}>
                <div className='link-remove' onClick={this.handleLinkRemove.bind(this, link)} />
              </Permission>
            </Toolbar>
          </Link>
        })}
      </Bundle>
    </Content>
  }
}

export default enhancer(BundleContainer)
