import CopyToClipboard from 'react-copy-to-clipboard'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import { Select } from 'components'
import { SHARE_PERMISSIONS } from 'constants'
import './UrlShare.css'

let enhancer = compose(
  withState('copied', 'updateCopied', false)
)

class UrlShare extends React.Component {
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
    let options = SHARE_PERMISSIONS.map(item => ({
       id: item.id, name: `Can ${item.name.toLowerCase()}`
     }))

    return (
      <div className='permissions'>
        <Select
          value={resource.share_url_permission}
          options={options}
          onChange={::this.handleUrlPermissionChange} />
      </div>
    )
  }

  render () {
    let copyLinkClass = 'url-icon' + (this.props.copied ? ' active' : '')
    let copyText = this.props.copied ? 'copied!!!' : 'Copy sharable link'

    return (
      <div className='shareable-url'>
        <div className='dimmed-text'>People with this link</div>
        <div>{this.renderUrlPermissionsAndDelete()}</div>
        <CopyToClipboard text={this.props.resource.share_url}>
          <div className='copy-link' onClick={() => this.props.updateCopied(true)}>
            <div className={copyLinkClass}/>
            <span className='dimmed-text'>{copyText}</span>
          </div>
        </CopyToClipboard>
      </div>
    )
  }
}

export default enhancer(UrlShare)
