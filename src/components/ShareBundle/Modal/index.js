import ImmutablePropTypes from 'react-immutable-proptypes'
import ui from 'redux-ui'
import './index.css'

export default class ShareBundleModal extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
  }

  render () {
    if (!this.props.ui.isOpen) return false

    return (
      <div className='change-collection-modal'>

      </div>
    )
  }
}
