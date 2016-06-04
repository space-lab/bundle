import ImmutablePropTypes from 'react-immutable-proptypes'
import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import Modal from 'components/ShareResource/Modal'

@ui({
  state: { q: '', isOpen: false }
})
@listensToClickOutside()
export default class ToolbarShareItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceName: React.PropTypes.string.isRequired
  }

  handleClickOutside (e) {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    let { resource, getBundle, updateUI } = this.props
    if (!resource.full_response) getBundle(resource.id)

    updateUI('isOpen', true)
  }

  render () {
    return (
      <div className='relative-toolbar'>
        <div className='icon icon-toolbar-share' onClick={::this.openModal}/>
        <Modal {...this.props} />
      </div>
    )
  }
}
