import ImmutablePropTypes from 'react-immutable-proptypes'
import { ShareResource } from 'components'

export default class ToolbarShareItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceName: React.PropTypes.string.isRequired,
    updateUI: React.PropTypes.func.isRequired
  }

  openModal () {
    let { resource, resourceName, updateUI } = this.props
    let { top, left } = this.refs.toolbar.getBoundingClientRect()

    updateUI('position', { top, left: left - 5 })
    updateUI('resourceId', resource.id)
    updateUI('isOpen', true)
  }

  render () {
    return <div className='relative-toolbar' ref='toolbar'>
      <div className='icon icon-toolbar-share' onClick={::this.openModal}/>
    </div>
  }
}
