import ui from 'redux-ui'
import { connect } from 'react-redux'

import Selectors from 'selectors'
import { linksWithAuthorIds } from 'helpers'
import Bundle from './Bundle'

import * as linkActions from 'actions/Link'
import * as shareActions from 'actions/Share'
import * as searchActions from 'actions/Search'
import * as bundleActions from 'actions/Bundle'
import * as collectionActions from 'actions/Collection'

const connectState = (state) => ({
  bundle: Selectors.currentBundle(state),
  users: state.User.get('byId'),
  links: state.Link.get('byId'),
  currentLink: Selectors.currentLink(state),
  bundleId: state.Route.bundleId,
  collections: state.Collection.get('byId'),
  receivedAllCollections: state.Collection.get('receivedAll')
})

const connectProps = {
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
    const { getBundle, bundleId } = this.props

    if (bundleId) getBundle(bundleId)

    if (!this.props.receivedAllCollections) {
      this.props.getCollections()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { getBundle, bundleId, resetUI } = this.props
    const nextBundleId = nextProps.bundleId

    if (bundleId !== nextBundleId) {
      resetUI()
      getBundle(nextBundleId)
    }
  }

  toggleEdit (save) {
    const {
      bundle,
      links,
      updateBundle,
      updateUI,
      ui
    } = this.props

    const bundleLinks = bundle.links.map(id => links.get(id))

    if (!save) return updateUI('editMode', !ui.editMode)

    const payload = {
      name: ui.name,
      description: ui.description,
      links_attributes: linksWithAuthorIds(bundleLinks)
    }

    updateBundle(bundle.id, payload)
    updateUI('editMode', !ui.editMode)
  }

  render () {
    const { bundle } = this.props

    if (!bundle || !bundle.full_response) {
      return false
    }

    return <Bundle {...this.props} toggleEdit={::this.toggleEdit} />
  }
}
