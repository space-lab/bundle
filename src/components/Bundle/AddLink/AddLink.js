import ImmutablePropTypes from 'react-immutable-proptypes'
import { EnterUrl, Link } from 'components'

export default class AddLink extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    user: ImmutablePropTypes.record.isRequired,
    link: ImmutablePropTypes.record,
    handleLinkAdd: React.PropTypes.func.isRequired,
    handleUrlEnter: React.PropTypes.func.isRequired,
    autoFocus: React.PropTypes.bool
  }

  renderLinkPreview () {
    let { user, link, handleAddLink } = this.props

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
        onClick={handleAddLink.bind(this, link)}
        className='add-link-button'>
        Add Link
      </button>
    </div>
  }

  renderEnterUrl () {
    let { user, bundle, handleUrlEnter, autoFocus } = this.props

    return <EnterUrl
      userImage={user.image}
      bundleId={bundle.id}
      autoFocus={autoFocus}
      handeUrlEnter={handleUrlEnter} />
  }

  render () {
    return this.props.currentLink
      ? this.renderLinkPreview()
      : this.renderEnterUrl()
  }
}
