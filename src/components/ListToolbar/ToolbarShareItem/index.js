import ImmutablePropTypes from 'react-immutable-proptypes'
import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import { ShareResource } from 'components'

@ui({
  state: { q: '', isOpen: false, position: null }
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
      this.props.updateUI('position', null)
    }
  }

  openModal () {
    const { resource, resourceName, getBundle, getCollection, updateUI } = this.props
    const { top, left } = this.refs.toolbar.getBoundingClientRect()

    if (!resource.full_response) {
      resourceName === 'Bundle' ? getBundle(resource.id) : getCollection(resource.id)
    }

    updateUI('position', { top, left: left - 5 })
    updateUI('isOpen', true)
  }

  render () {
    return (
      <div className='relative-toolbar' ref='toolbar'>
        <div className='icon icon-toolbar-share' onClick={::this.openModal}/>
        <ShareResource {...this.props} position={this.props.ui.position}/>
      </div>
    )
  }
}
