import CopyToClipboard from 'react-copy-to-clipboard'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from 'constants'
import './UrlShare.css'

export default class UrlShare extends React.Component {
  static propTypes = {
    resourceName: React.PropTypes.string.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    changeUrlPermission: React.PropTypes.func.isRequired,
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

  renderUrlPermissionsAndDelete () {
    let { resource } = this.props
    let options = SHARE_PERMISSIONS

    return (
      <div className='permissions'>
        <select
          className='own-select-dropdown'
          value={resource.share_url_permission}
          onChange={::this.handleUrlPermissionChange}>
          {options.map(option =>
            <option key={option.id} value={option.id}>{`Can ${option.name.toLowerCase()}`}</option>
          )}
        </select>
      </div>
    )
  }

  render () {
    return (
      <div className='shareable-url'>
        <div className='dimmed-text'>People with this link</div>
        <div>{this.renderUrlPermissionsAndDelete()}</div>
        <CopyToClipboard text={this.props.resource.share_url}>
          <div className='copy-link'>
            <div className='url-icon'/>
            <span className='dimmed-text'>Copy sharable link</span>
          </div>
        </CopyToClipboard>
      </div>
    )
  }
}
