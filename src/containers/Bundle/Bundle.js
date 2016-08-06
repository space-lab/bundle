import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { BundleSelectors, UserSelectors, LinkSelectors, CollectionSelectors } from 'selectors'
import { AlertActions, BundleActions, CollectionActions, LinkActions, UserActions,
  ShareActions, SearchActions } from 'actions'
import { Content, Header, Bundle, Editable, AddLink, Link, Permission, Toolbar,
  ChangeCollection, JoinBundle, LeaveResource, ShareBundle } from 'components'

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

let enhancer = compose(
  connect(connectState, connectProps),
  DragDropContext(HTML5Backend)
)

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

  changeLinkPosition (id, position) {
    let props = this.props
    let oldIndex = props.bundle.links.indexOf(id)
    let newIndex = position - 1

    let links = this.props.bundle.links.delete(oldIndex).insert(newIndex, id)
    let payload = links.map((id, pos) => ({ id, position: pos + 1})).toJS()

    props.reorderLinks(props.bundle.id, payload)
  }

  render () {
    let props = this.props
    let currentUserId = props.currentUser.id

    if (!props.bundle) return false

    let shareType = props.bundle.shareTypeFor(currentUserId) || 'Bundle'
    let shareResourceId = shareType === 'Bundle' ? props.bundle.id : props.bundle.collection_id

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
            <LeaveResource
              resourceName={shareType}
              resourceId={shareResourceId}
              shareId={props.bundle.shareIdFor(currentUserId)}
              leaveShare={props.leaveShare}
              addAlert={props.addAlert} />
          </Permission>

          <Permission allow={props.bundle.canShare(currentUserId)}>
            <ShareBundle


              resource={props.bundle}
              resourceId={shareResourceId}
              resourceName='Bundle'
              inviteUsers={props.inviteUsers}
              userAutocomplete={props.userAutocomplete}
              getAutocompleteUsers={props.getAutocompleteUsers}
              resetAutocompleteUsers={props.resetAutocompleteUsers}
              changeSharePermission={props.changeSharePermission}
              removeShare={props.removeShare}
              getShareUrl={props.getShareUrl}
              changeUrlPermission={props.changeUrlPermission}
              removeUrlShare={props.removeUrlShare}
              users={props.users}
              updateUsers={props.updateUsers}
              permission={props.permission}
              updatePermission={props.updatePermission}
              shareModal={props.shareModal}
              updateShareModal={props.updateShareModal} />
          </Permission>
        </div>
      </Header>

      <Bundle>
        <Editable
          className='bundle-name'
          autoFocus={!props.bundle.name}
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

        {props.bundle.get('links').map((id, i) => {
          let link = props.links.get(id)
          let user = props.users.get(link.creator)
          let completedClass = 'link-complete' + (link.completed ? ' completed' : '')

          return <Link key={link.id}
            id={link.id}
            position={link.position}
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            createdAt={link.created_at}
            completed={link.completed}
            creatorName={user.name}
            changeLinkPosition={::this.changeLinkPosition}
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
