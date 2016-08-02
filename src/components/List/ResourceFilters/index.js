import './index.css'

export default class ResourceFilters extends React.Component {
  static propTypes = {
    resourceFilter: React.PropTypes.string.isRequired,
    updateResourceFilter: React.PropTypes.func.isRequired
  }

  filterClass (filter) {
    return 'filter' + (filter === this.props.resourceFilter? ' active' : '')
  }

  render () {
    let { updateResourceFilter } = this.props

    return <div className='resource-filters'>
      <span
        className={this.filterClass('recent')}
        onClick={() => updateResourceFilter('recent')}>
        Recent
      </span>

      <span
        className={this.filterClass('mine')}
        onClick={() => updateResourceFilter('mine')}>
        Mine
      </span>

      <span
        className={this.filterClass('shared')}
        onClick={() => updateResourceFilter('shared')}>
        Shared with me
      </span>
    </div>
  }
}
