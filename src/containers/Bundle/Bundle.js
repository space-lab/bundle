import { connect } from 'react-redux'
import { linksWithAuthorIds } from 'helpers'
import Selectors from 'selectors'
import * as linkActions from 'actions/Link'
import * as shareActions from 'actions/Share'
import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'
import * as alertActions from 'actions/Alert'
import * as userAutocompleteActions from 'actions/UserAutocomplete'
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
  receivedAllCollections: Selectors.receivedAllCollections(state),
  userAutocomplete: state.UserAutocomplete
})

let connectProps = {
  ...linkActions,
  ...shareActions,
  ...alertActions,
  ...searchActions,
  ...bundleActions,
  ...collectionActions,
  ...userAutocompleteActions
}

@connect(connectState, connectProps)
export default class BundleContainer extends React.Component {
  componentWillMount () {
    let { getBundle, bundleId, receivedAllCollections, getCollections } = this.props

    if (bundleId) getBundle(bundleId)
    if (!receivedAllCollections) getCollections()
  }

  componentWillReceiveProps ({ bundleId: nextBundleId }) {
    let { getBundle, bundleId } = this.props
    if (bundleId !== nextBundleId) getBundle(nextBundleId)
  }

  render () {
    let {
      users,
      links,
      bundle,
      addLink,
      fetchLink,
      removeLink,
      currentUser,
      currentLink,
      collections,
      updateBundle,
      joinUrlShare,
      addAlert
    } = this.props

    if (!bundle || !bundle.full_response) return false

    return <Content>
      <Header>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          canChangeCollection={bundle.canChangeCollection(currentUser.id)}
          updateBundle={updateBundle} />

        <div className='align-right'>
          <JoinBundle
            bundle={bundle}
            currentUserId={currentUser.id}
            joinUrlShare={joinUrlShare}
            addAlert={addAlert} />

          <ShareBundle
            canShare={bundle.canShare(currentUser.id)}
            {...this.props} // TODO big no no no
            resourceName='Bundle'
            resource={bundle} />
        </div>
      </Header>

      <Bundle>
        <Editable
          className='bundle-name'
          value={bundle.name}
          editMode={bundle.canEdit(currentUser.id)}
          placeholder='Name goes here...'
          onBlur={e => updateBundle(bundle.id, { name: e.target.value })} />

        <Editable
          type='textarea'
          className='bundle-description'
          value={bundle.description}
          editMode={bundle.canEdit(currentUser.id)}
          placeholder='Description goes here...'
          onBlur={e => updateBundle(bundle.id, { description: e.target.value })} />

        <AddLink
          bundle={bundle}
          user={currentUser}
          link={currentLink}
          handleUrlEnter={url => fetchLink(url, bundle.id)}
          handleLinkAdd={link => addLink(link, bundle.id)} />

        {bundle.get('links').map((id, index) => {
          let link = links.get(id)
          let user = users.get(link.creator)

          return <Link
            key={index}
            url={link.url}
            image={link.image}
            title={link.title}
            description={link.description || ''}
            createdAt={link.created_at}
            creatorName={user.name}
            creatorImage={user.image}
            canRemove={bundle.canEdit(currentUser.id)}
            handleLinkRemove={removeLink.bind(this, link.id, bundle.id)} />
        })}
      </Bundle>
    </Content>
  }
}
