import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from 'constants'
import './index.css'

export default class UrlShare extends React.Component {
  static propTypes = {
    resourceName: React.PropTypes.string.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    getShareUrl: React.PropTypes.func.isRequired,
    changeUrlPermission: React.PropTypes.func.isRequired,
    removeUrlShare: React.PropTypes.func.isRequired
  }

  handleUrlGet () {
    const { getShareUrl, resourceName, resource } = this.props
    getShareUrl(resourceName, resource.id)
  }

  handleShareUrlRemove () {
    const { removeUrlShare, resourceName, resource } = this.props
    removeUrlShare(resourceName, resource.id)
  }

  handleUrlPermissionChange ({ target }) {
    const { changeUrlPermission, resourceName, resource } = this.props
    changeUrlPermission(resourceName, resource.id, target.value)
  }

  renderButtonOrUrl () {
    const { share_url } = this.props.resource

    if (share_url) {
      return (
        <div className='url'>
          <div className='url-icon'/>

          <input
            defaultValue={share_url}
            readOnly={true}
            autoFocus={true}
            onFocus={({ target }) => target.select()}/>
        </div>
      )
    } else {
      return (
        <div className='clickable' onClick={::this.handleUrlGet}>
          <div className='url-icon'/>
          <span>Get shareable url...</span>
        </div>
      )
    }
  }

  renderUrlPermissionsAndDelete () {
    const { resource } = this.props
    const options = SHARE_PERMISSIONS

    if (!resource.share_url) return null

    return (
      <div className='permissions'>
        <select
          value={resource.share_url_permission}
          onChange={::this.handleUrlPermissionChange}>
          {options.map(option =>
            <option key={option.id} value={option.id}>{option.name}</option>
          )}
        </select>

        <div
          className='icon close-icon'
          onClick={::this.handleShareUrlRemove}/>
      </div>
    )
  }

  render () {
    return (
      <div className='shareable-url'>
        {::this.renderButtonOrUrl()}
        {::this.renderUrlPermissionsAndDelete()}
      </div>
    )
  }
}
