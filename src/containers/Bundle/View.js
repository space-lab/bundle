import ui from 'redux-ui'
import { connect } from 'react-redux'
import { linksWithAuthorIds } from 'helpers'
import { Header, AddLink } from 'containers'
import { Content, Bundle, Editable, Link } from 'components'
import Selectors from 'selectors'
import * as linkActions from 'actions/Link'
import * as shareActions from 'actions/Share'
import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'

let connectState = (state) => ({
  bundle: Selectors.currentBundle(state),
  users: state.User.get('byId'),
  links: state.Link.get('byId'),
  currentLink: Selectors.currentLink(state),
  bundleId: state.Route.bundleId,
  collections: state.Collection.get('byId'),
  receivedAllCollections: state.Collection.get('receivedAll')
})

let connectProps = {
  ...linkActions,
  ...shareActions,
  ...searchActions,
  ...bundleActions,
  ...collectionActions
}

@ui({
  key: 'bundle',
  state: {
    editMode: false,
    name: '',
    description: ''
  }
})
@connect(connectState, connectProps)
export default class BundleViewContainer extends React.Component {
  componentWillMount () {
    let { getBundle, bundleId } = this.props

    if (bundleId) getBundle(bundleId)

    if (!this.props.receivedAllCollections) {
      this.props.getCollections()
    }
  }

  componentWillReceiveProps (nextProps) {
    let { getBundle, bundleId, resetUI } = this.props
    let nextBundleId = nextProps.bundleId

    if (bundleId !== nextBundleId) {
      resetUI()
      getBundle(nextBundleId)
    }
  }

  // TODO: remove toggle!
  toggleEdit (save) {
    let {
      bundle,
      links,
      updateBundle,
      updateUI,
      ui
    } = this.props

    let bundleLinks = bundle.links.map(id => links.get(id))

    if (!save) return updateUI('editMode', !ui.editMode)

    let payload = {
      name: ui.name,
      description: ui.description,
      links_attributes: linksWithAuthorIds(bundleLinks)
    }

    updateBundle(bundle.id, payload)
    updateUI('editMode', !ui.editMode)
  }

  handleLinkRemove (id) {
    let { bundle, updateBundle } = this.props

    let payload = {
      links_attributes: [{ id, _destroy: true }]
    }

    updateBundle(bundle.id, payload)
  }

  render () {
    let {
      ui,
      updateUI,
      bundle,
      users,
      links,
      currentLink,
    } = this.props

    if (!bundle || !bundle.full_response) return false

    return <Content>
      <Header {...this.props} toggleEdit={::this.toggleEdit} />

      <Bundle>
        <Editable
          autoFocus
          value={bundle.name}
          placeholder='Name goes here...'
          editMode={ui.editMode}
          onChange={value => updateUI('name', value)} />

        <Editable
          type='textarea'
          value={bundle.description}
          placeholder='Description goes here...'
          editMode={ui.editMode}
          onChange={value => updateUI('description', value)} />

        <AddLink
          bundle={bundle}
          currentLink={currentLink}
          links={links} />

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
