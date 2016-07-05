import { EnterUrl, Link } from 'components'

export default class AddLink extends React.Component {
  addLinkHandler (link) {
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

  handeUrlEnter (url) {
    this.props.fetchLink(url, this.props.bundle.id)
  }

  renderLinkPreview () {
    let { user, link } = this.props

    return <div className='link-preview-container'>
      <Link
        url={link.url}
        image={link.image}
        title={link.title}
        description={link.description}
        createdAt={new Date()}
        creatorName={user.name}
        creatorImage={user.image} />

      <button
        onClick={this.addLinkHandler.bind(this, link)}
        className='add-link-button'>
        Add Link
      </button>
    </div>
  }

  renderEnterUrl () {
    let { user, bundle } = this.props

    return (
      <EnterUrl
        userImage={user.image}
        bundleId={bundle.id}
        handeUrlEnter={::this.handeUrlEnter} />
    )
  }

  render () {
    return this.props.currentLink
      ? this.renderLinkPreview()
      : this.renderEnterUrl()
  }
}
