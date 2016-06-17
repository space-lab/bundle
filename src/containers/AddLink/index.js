import { connect } from 'react-redux'
import Selectors from 'selectors'
import { nextId } from 'helpers'
import * as bundleActions from 'actions/Bundle'
import * as linkActions from 'actions/Link'
import EnterUrl from './EnterUrl'
import LinkPreview from './LinkPreview'

const connectState = state => ({
  bundle: Selectors.currentBundle(state),
  currentUser: Selectors.currentUser(state)
})

const connectProps = {
  ...bundleActions,
  ...linkActions
}

@connect(connectState, connectProps)
export default class BundleAddLink extends React.Component {
  addLinkHandler (link) {
    const payloadLink = link.toJS()
    const {
      currentUser,
      bundle,
      links,
      clearCurrentLink,
      updateBundle,
      addCurrentLinkToBundle
    } = this.props

    payloadLink.creator_id = currentUser.id

    const payload = {
      links_attributes: [payloadLink]
    }

    if (bundle.isNewBundle) {
      const linkWithCreator = link
        .set('creator', currentUser.id)
        .set('id', nextId(links))

      return addCurrentLinkToBundle(bundle.id, linkWithCreator)
    }

    updateBundle(bundle.id, payload)
    clearCurrentLink(bundle.id)
  }

  handeUrlEnter (url) {
    this.props.fetchLink(url, this.props.bundle.id)
  }

  renderLinkPreview () {
    const { currentUser, currentLink } = this.props

    return (
      <LinkPreview
        link={currentLink}
        currentUser={currentUser}
        addLinkHandler={::this.addLinkHandler}/>
    )
  }

  renderEnterUrl () {
    const { currentUser, bundle } = this.props

    return (
      <EnterUrl
        image={currentUser.image}
        bundleId={bundle.id}
        handeUrlEnter={::this.handeUrlEnter}/>
    )
  }

  render () {
    return this.props.currentLink
      ? this.renderLinkPreview()
      : this.renderEnterUrl()
  }
}
