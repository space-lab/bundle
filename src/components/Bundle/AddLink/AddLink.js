import ImmutablePropTypes from 'react-immutable-proptypes'
import { EnterUrl, Link } from 'components'
import './AddLink.css'

export default class AddLink extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    user: ImmutablePropTypes.record.isRequired,
    link: ImmutablePropTypes.record,
    handleLinkAdd: React.PropTypes.func.isRequired,
    handleLinkRemove: React.PropTypes.func.isRequired,
    handleUrlEnter: React.PropTypes.func.isRequired,
    autoFocus: React.PropTypes.bool
  }

  render () {
    let { user, bundle, link, handleLinkAdd,
      handleLinkRemove, handleUrlEnter, autoFocus } = this.props

    return this.props.link
      ? <div className='link-preview-container'>
          <Link
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            creatorName={user.name}
            creatorImage={user.image}
            canRemove
            handleLinkRemove={handleLinkRemove} />

          <button
            onClick={handleLinkAdd.bind(this, link)}
            className='main-button'>
            Add Link
          </button>
        </div>
      : <EnterUrl
          userImage={user.image}
          bundleId={bundle.id}
          autoFocus={autoFocus}
          handeUrlEnter={handleUrlEnter} />
  }
}
