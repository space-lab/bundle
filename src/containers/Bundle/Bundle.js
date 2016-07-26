import { connect } from 'react-redux'
import { linksWithAuthorIds } from 'helpers'
import Selectors from 'selectors'
import * as linkActions from 'actions/Link'
import * as shareActions from 'actions/Share'
import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as alertActions from 'actions/Alert'
import * as userActions from 'actions/User'
import {
  Content,
  Header,
  Bundle,
  Editable,
  AddLink,
  Link,
  ChangeCollection,
  JoinBundle,
  ShareBundle
} from 'components'

let connectState = (state) => ({
  bundleId: state.Route.bundleId,
  users: Selectors.users(state),
  links: Selectors.links(state),
  bundle: Selectors.currentBundle(state),
  currentLink: Selectors.currentLink(state),
  currentUser: Selectors.currentUser(state),
  collections: Selectors.collections(state),
  userAutocomplete: Selectors.autocompleteUsers(state),
  receivedAllCollections: Selectors.receivedAllCollections(state)
})

let connectProps = {
  ...linkActions,
  ...shareActions,
  ...alertActions,
  ...searchActions,
  ...bundleActions,
  ...collectionActions,
  ...userActions
}

@connect(connectState, connectProps)
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

        <AddLink
          bundle={props.bundle}
          user={props.currentUser}
          link={props.currentLink}
          handleUrlEnter={url => props.fetchLink(url, props.bundle.id)}
          handleLinkAdd={link => props.addLink(link, props.bundle.id)}
          handleLinkRemove={() => props.clearCurrentLink(props.bundle.id)} />

        {props.bundle.get('links').map((id) => {
          let link = props.links.get(id)
          let user = props.users.get(link.creator)

          return <Link
            key={link.id}
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            completed={link.completed}
            createdAt={link.created_at}
            creatorName={user.name}
            creatorImage={user.image}
            canRemove={props.bundle.canEdit(props.currentUser.id)}
            canComplete={true}
            handleLinkRemove={props.removeLink.bind(this, link.id, props.bundle.id)}
            handleLinkComplete={props.linkToggleCompleted.bind(this, link.id)} />
        })}
      </Bundle>
    </Content>
  }
}
