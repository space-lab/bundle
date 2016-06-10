import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from 'constants'
import './index.css'

//import ui from 'redux-ui'
//@ui({ state: { tags: List() } })
export default class UrlShare extends React.Component {
  static propTypes = {
    resourceName: React.PropTypes.string.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    getShareUrl: React.PropTypes.func.isRequired
  }

  handleUrlGet () {
    const { getShareUrl, resourceName, resource } = this.props
    getShareUrl(resourceName, resource.id)
  }

  handleUrlPermissionChange ({ target }) {
    const { changeUrlPermission, resourceName, resource } = this.props
    changeUrlPermission(resourceName, resource.id, target.value)
  }

  renderUrlPermissions () {
    const options = SHARE_PERMISSIONS

    return (
      <select onChange={::this.handleUrlPermissionChange}>
        {options.map(option =>
          <option key={option.id} value={option.id}>{option.name}</option>
        )}
      </select>
    )
  }

  renderButtonOrUrl () {
    const { share_url } = this.props.resource

    if (share_url) {
      return (
        <div className='url'>
          <div className='url-icon'/>
          <input>{share_url}</input>
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

  render () {
    return (
      <div className='shareable-url'>
        {::this.renderButtonOrUrl()}
        {::this.renderUrlPermissions()}
      </div>
    )
  }
}
