import ImmutablePropTypes from 'react-immutable-proptypes'
import { ShareResource } from 'components'

export default class ToolbarShareItem extends React.Component {
  static propTypes = {
    resource: ImmutablePropTypes.record.isRequired,
    resourceName: React.PropTypes.string.isRequired,
    updateShareModal: React.PropTypes.func.isRequired
  }

  openModal () {
    let { resource, resourceName, updateShareModal } = this.props
    let { top, left } = this.refs.toolbar.getBoundingClientRect()

    updateShareModal({
      position: { top, left: left - 5 },
      resourceId: resource.id,
      isOpen: true
    })
  }

  render () {
    return <div className='relative-toolbar' ref='toolbar'>
      <div className='icon icon-toolbar-share' onClick={::this.openModal}/>
    </div>
  }
}
