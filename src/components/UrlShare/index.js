import ImmutablePropTypes from 'react-immutable-proptypes'
import { SHARE_PERMISSIONS } from 'constants'
import './index.css'

//import ui from 'redux-ui'
//@ui({ state: { tags: List() } })
export default class UrlShare extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
  }

  handleUrlPermissionChange ({ target }) {
    console.log(target.value)
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

  render () {
    return (
      <div className='shareable-url'>
        <div className='clickable'>
          <div className='url-icon'/>
          <span>Get shareable url...</span>
        </div>

        {::this.renderUrlPermissions()}
      </div>
    )
  }
}
