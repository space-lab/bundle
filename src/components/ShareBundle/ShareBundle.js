import ImmutablePropTypes from 'react-immutable-proptypes'
import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import { ShareResource } from 'components'

import './ShareBundle.css'

@ui({
  state: { q: '', isOpen: false }
})
@listensToClickOutside()
export default class ShareBundle extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record,
    resourceName: React.PropTypes.string
  }

  handleClickOutside (e) {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    this.props.updateUI('isOpen', true)
  }

  render () {
    return (
      <div className='share-bundle-wrapper'>
        <button className='round-button' onClick={::this.openModal}>
          Share
        </button>

        <ShareResource {...this.props} />
      </div>
    )
  }
}
