import { shouldAppear } from 'helpers'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { BundleSelectors, UserSelectors, LinkSelectors, CollectionSelectors } from 'selectors'
import { AlertActions, BundleActions, CollectionActions, LinkActions, UserActions,
  ShareActions, SearchActions } from 'actions'
import { Content, Header, Bundle, Editable, AddLink, Link, Permission, Toolbar,
  ChangeCollection, JoinBundle, ShareBundle } from 'components'

let connectState = (state) => ({
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

@connect(connectState, connectProps)
@ui({ state: { activeLink: false } })
export default class BundleContainer extends React.Component {
  componentWillMount () {
    let { bundle, getBundle, bundleId, receivedAllCollections, getCollections } = this.props

    if (bundleId && !bundle) getBundle(bundleId)
    if (!receivedAllCollections) getCollections()
  }

  componentWillReceiveProps ({ bundle: nextBundle, bundleId: nextBundleId }) {
    let { getBundle, bundleId } = this.props
    if (bundleId !== nextBundleId && !nextBundle) getBundle(nextBundleId)
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
    if (!props.bundle) return false

    return <Content>
      <Header>
        <ChangeCollection
          bundle={props.bundle}
          collections={props.collections}
          canChangeCollection={props.bundle.canChangeCollection(props.currentUser.id)}
          updateBundle={props.updateBundle} />

        <div className='align-right'>
          <JoinBundle
            bundle={props.bundle}
            currentUserId={props.currentUser.id}
            joinUrlShare={props.joinUrlShare}
            addAlert={props.addAlert} />

          <ShareBundle
            canShare={props.bundle.canShare(props.currentUser.id)}
            {...this.props} // TODO big no no no
            resourceName='Bundle'
            resource={props.bundle} />
        </div>
      </Header>

      <Bundle>
        <Editable
          className='bundle-name'
          value={props.bundle.name || ''}
          editMode={props.bundle.canEdit(props.currentUser.id)}
          placeholder='Name goes here...'
          onBlur={e => props.updateBundle(props.bundle.id, { name: e.target.value })} />

        <Editable
          type='textarea'
          className='bundle-description'
          value={props.bundle.description || ''}
          editMode={props.bundle.canEdit(props.currentUser.id)}
          placeholder='Description goes here...'
          onBlur={e => props.updateBundle(props.bundle.id, { description: e.target.value })} />

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
            onMouseEnter={() => props.updateUI('activeLink', link.id)}
            onMouseLeave={() => props.updateUI('activeLink', null)}
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
                <div className={completedClass} style={shouldAppear(link.id === props.ui.activeLink)}
                  onClick={this.handleLinkComplete.bind(this, link)} />
              </Permission>

              <Permission allow={link.canRemove(props.currentUser.id)}>
                <div className='link-remove' style={shouldAppear(link.id === props.ui.activeLink)}
                  onClick={this.handleLinkRemove.bind(this, link)} />
              </Permission>
            </Toolbar>
          </Link>
        })}
      </Bundle>
    </Content>
  }
}
