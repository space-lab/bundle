import { connect } from 'react-redux'
import ui from 'redux-ui'
import { browserHistory } from 'react-router'
import { NEW_BUNDLE_ID } from 'constants'
import { linksWithoutAuthors } from 'helpers'
import Bundle from './Bundle'
import * as bundleActions from 'actions/Bundle'
import * as linkActions from 'actions/Link'
import * as collectionActions from 'actions/Collection'

const connectState = (state) => ({
  currentBundle: state.Bundle.getIn(['byId', NEW_BUNDLE_ID]),
  currentLink: state.Link.getIn(['current', NEW_BUNDLE_ID]),
  links: state.Link.get('byId'),
  users: state.User.get('byId'),
  routeCollectionId: state.Route.get('collectionId'),
  collections: state.Collection.get('byId'),
  receivedAllCollections: state.Collection.get('receivedAll')
})

const connectProps = {
  ...bundleActions,
  ...linkActions,
  ...collectionActions
}

@ui({
  key: 'bundleNew',
  state: {
    name: '',
    description: '',
    editMode: true
  }
})
@connect(connectState, connectProps)
export default class BundleNewContainer extends React.Component {
  componentWillMount () {
    let props = this.props

    props.generateNewBundle(props.routeCollectionId)

    if (!props.receivedAllCollections) props.getCollections()
  }

  saveBundle () {
    let { currentBundle, links, createBundle, ui } = this.props
    let bundleLinks = currentBundle.links.map(id => links.get(id).delete('id'))

    let payload = {
      name: ui.name,
      description: ui.description,
      links_attributes: linksWithoutAuthors(bundleLinks)
    }

    createBundle(payload).then(bundle => {
      let newBundleRoutePath = `/bundle/${bundle.id}`
      browserHistory.push(newBundleRoutePath)
    })
  }

  removeLink (index) {
    let { currentBundle, removeLinkFromBundle } = this.props
    removeLinkFromBundle(currentBundle.id, index)
  }

  render () {
    let { currentBundle, updateBundleInfo, updateLink } = this.props

    if (!currentBundle) return false

    return <Bundle
      {...this.props}
      bundle={currentBundle}
      handleChange={updateBundleInfo}
      handleLinkEdit={updateLink}
      handleLinkRemove={::this.removeLink}
      toggleEdit={::this.saveBundle}
    />
  }
}
