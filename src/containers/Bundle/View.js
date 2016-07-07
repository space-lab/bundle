import ui from 'redux-ui'
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
  receivedAllCollections: Selectors.receivedAllCollections(state)
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

@ui({
  key: 'bundle',
  state: {
    name: '',
    description: ''
  }
})
@connect(connectState, connectProps)
export default class BundleViewContainer extends React.Component {
  componentWillMount () {
    let { getBundle, bundleId, receivedAllCollections, getCollections } = this.props

    if (bundleId) getBundle(bundleId)
    if (!receivedAllCollections) getCollections()
  }

  componentWillReceiveProps ({ bundleId: nextBundleId }) {
    let { getBundle, bundleId, resetUI } = this.props

    if (bundleId !== nextBundleId) {
      resetUI()
      getBundle(nextBundleId)
    }
  }

  // TODO dup
  handleLinkRemove (id) {
    let { bundle, updateBundle } = this.props

    let payload = {
      links_attributes: [{ id, _destroy: true }]
    }

    updateBundle(bundle.id, payload)
  }

  // TODO dup
  handleLinkAdd (link) {
    let payloadLink = link.toJS()
    let {
      currentUser,
      bundle,
      links,
      clearCurrentLink,
      updateBundle,
      addCurrentLinkToBundle
    } = this.props

    payloadLink.creator_id = currentUser.id

    let payload = {
      links_attributes: [payloadLink]
    }

    if (bundle.isNewBundle) {
      let linkWithCreator = link
        .set('creator', currentUser.id)
        .set('id', nextId(links))

      return addCurrentLinkToBundle(bundle.id, linkWithCreator)
    }

    updateBundle(bundle.id, payload)
    clearCurrentLink(bundle.id)
  }

  //TODO refactor
  renderShareButton () {
    let props = this.props
    if (!props.bundle.canShare(props.currentUser.id)) return false

    return <ShareBundle {...props} resourceName='Bundle' resource={props.bundle} />
  }

  render () {
    let {
      ui,
      updateUI,
      users,
      links,
      bundle,
      fetchLink,
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

          {this.renderShareButton()}
        </div>
      </Header>

      <Bundle>
        <Editable
          autoFocus
          value={bundle.name}
          editMode
          placeholder='Name goes here...'
          onChange={value => updateUI('name', value)} />

        <Editable
          type='textarea'
          value={bundle.description}
          editMode
          placeholder='Description goes here...'
          onChange={value => updateUI('description', value)} />

        <AddLink
          bundle={bundle}
          user={currentUser}
          link={currentLink}
          links={links}
          handleUrlEnter={url => fetchLink(url, bundle.id)}
          handleLinkAdd={link => this.handleLinkAdd(link)} />

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
            handleLinkRemove={this.handleLinkRemove.bind(this, link.id)} />
        })}
      </Bundle>
    </Content>
  }
}
