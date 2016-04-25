import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { NEW_BUNDLE_ID } from '../../constants'
import { linksWithoutAuthors } from '../../helpers'
import Wrapper from '../BundleView/Wrapper'

import * as bundleActions from '../../actions/Bundle'
import * as linkActions from '../../actions/Link'

const connectState = (state) => ({
  currentBundle: state.Bundle.getIn(['byId', NEW_BUNDLE_ID]),
  currentLink: state.Link.getIn(['current', NEW_BUNDLE_ID]),
  links: state.Link.get('byId'),
  users: state.User.get('byId')
})

const connectProps = {
  ...bundleActions,
  ...linkActions
}

@connect(connectState, connectProps)
export default class BundleNewContainer extends React.Component {
  componentWillMount () {
    const { generateNewBundle } = this.props
    generateNewBundle()
  }

  saveBundle () {
    let { currentBundle, links, createBundle } = this.props
    let bundleLinks = currentBundle.get('links').map(id => links.get(id).delete('id'))

    const payload = {
      name: currentBundle.get('name'),
      description: currentBundle.get('description'),
      links_attributes: linksWithoutAuthors(bundleLinks)
    }

    createBundle(payload).then(bundle => {
      const newBundleRoutePath = `/bundles/${bundle.get('id')}`
      browserHistory.push(newBundleRoutePath)
    })
  }

  removeLink (index) {
    let { currentBundle, removeLinkFromBundle } = this.props
    removeLinkFromBundle(currentBundle.get('id'), index)
  }

  render () {
    const {
      currentBundle, currentLink, links, users,
      updateBundleInfo, updateLink
    } = this.props

    if (!currentBundle) return false

    return (
      <div className='bundle-view-wrapper'>
        <Wrapper
          bundle={currentBundle}
          users={users}
          currentLink={currentLink}
          links={links}
          editMode={true}
          handleChange={updateBundleInfo}
          handleLinkEdit={updateLink}
          handleLinkRemove={this.removeLink.bind(this)}
          toggleEdit={this.saveBundle.bind(this)}
        />
      </div>
    )
  }
}
