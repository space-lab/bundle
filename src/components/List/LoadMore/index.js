import './index.css'

export default class LoadMore extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool,
    page: React.PropTypes.number,
    getBundles: React.PropTypes.func.isRequired,
    updateUI: React.PropTypes.func.isRequired,
  }

  onLoadMoreClicked () {
    let { page, getBundles, updateUI } = this.props

    getBundles(page + 1)
    updateUI('page', page + 1)
  }

  render () {
    if (!this.props.show) return false
    return (
      <button className='main-button load-more-btn' onClick={::this.onLoadMoreClicked}>
        Load More
      </button>
    )
  }
}
