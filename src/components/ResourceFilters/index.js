import ui from 'redux-ui'
import './index.css'

@ui()
export default class ResourceFilters extends React.Component {
  static propTypes = {
    ui: React.PropTypes.object.isRecuared,
    updateUI: React.PropTypes.func.isRecuared
  }

  filterClass (filter) {
    return 'filter' + (filter == this.props.ui.filter ? ' active' : '')
  }

  render () {
    return (
      <div className='resource-filters'>
        <span
          className={::this.filterClass('recent')}
          onClick={() => this.props.updateUI('filter', 'recent')}>
          Recent
        </span>

        <span
          className={::this.filterClass('mine')}
          onClick={() => this.props.updateUI('filter', 'mine')}>
          Mine
        </span>

        <span
          className={::this.filterClass('shared')}
          onClick={() => this.props.updateUI('filter', 'shared')}>
          Shared with me
        </span>
      </div>
    )
  }
}
