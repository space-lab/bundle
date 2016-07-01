import { connect } from 'react-redux'
import Selectors from 'selectors'
import { nextId } from 'helpers'
import * as bundleActions from 'actions/Bundle'
import * as linkActions from 'actions/Link'
import { Link, EnterUrl } from 'components'
import './index.css'

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
    const { currentUser: user, currentLink: link } = this.props

    return <div className='link-preview-container'>
      <Link
        url={link.url}
        image={link.image}
        title={link.title}
        description={link.description}
        createdAt={new Date()}
        creatorName={user.name}
        creatorImage={user.image}
      />

      <button
        onClick={this.addLinkHandler.bind(this, link)}
        className='add-link-button'>
          Add Link
      </button>
    </div>
  }

  renderEnterUrl () {
    const { currentUser: user, bundle } = this.props

    return (
      <EnterUrl
        userImage={user.image}
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
