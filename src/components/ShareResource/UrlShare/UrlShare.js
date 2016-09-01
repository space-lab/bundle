import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from 'constants'
import './UrlShare.css'

export default class UrlShare extends React.Component {
  static propTypes = {
    resourceName: React.PropTypes.string.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    getShareUrl: React.PropTypes.func.isRequired,
    changeUrlPermission: React.PropTypes.func.isRequired,
    removeUrlShare: React.PropTypes.func.isRequired
  }

  handleUrlGet () {
    let { getShareUrl, resourceName, resource } = this.props
    getShareUrl(resourceName, resource.id)
  }

  handleShareUrlRemove () {
    let { removeUrlShare, resourceName, resource } = this.props
    removeUrlShare(resourceName, resource.id)
  }

  handleUrlPermissionChange ({ target }) {
    let permissionId = target.value
    let { resourceName, resource } = this.props

    if (permissionId == 3) {
      this.props.removeUrlShare(resourceName, resource.id)
    } else {
      this.props.changeUrlPermission(resourceName, resource.id, permissionId)
    }
  }

  renderButtonOrUrl () {
    let { share_url } = this.props.resource

    if (share_url) {
      return (
        <div className='url'>
          <div className='url-icon'/>

          <input
            defaultValue={share_url}
            readOnly
            autoFocus
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
    let options = SHARE_PERMISSIONS
      .map(item => ({ id: item.id, name: `Can ${item.name.toLowerCase()}`}))
      .concat({ id: 3, name: 'Remove'})

    if (!resource.share_url) return null

    return (
      <div className='permissions'>
        <select
          className='own-select-dropdown'
          value={resource.share_url_permission}
          onChange={::this.handleUrlPermissionChange}>
          {options.map(option =>
            <option key={option.id} value={option.id}>{option.name}</option>
          )}
        </select>
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
