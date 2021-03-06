import ImmutablePropTypes from 'react-immutable-proptypes'
import { EnterUrl, Link, Toolbar } from 'components'
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

  handleLinkRemove (link, event) {
    event.preventDefault()
    this.props.handleLinkRemove(link.id, this.props.bundle.id)
  }

  render () {
    let { user, bundle, link, handleLinkAdd, handleUrlEnter, autoFocus } = this.props

    return this.props.link
      ? <div className='link-preview-container'>
          <Link
            url={link.url}
            image={link.image}
            title={link.title || 'Link has no name'}
            description={link.description || ''}
            creatorName={user.name}
            creatorImage={user.image}>
            <Toolbar>
              <div className='link-remove' onClick={this.handleLinkRemove.bind(this, link)} />
            </Toolbar>
          </Link>

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
