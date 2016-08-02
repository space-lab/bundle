import './index.css'

export default class LoadMore extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    page: React.PropTypes.number.isRequired,
    getBundles: React.PropTypes.func.isRequired,
    updatePage: React.PropTypes.func.isRequired
  }

  onLoadMoreClicked () {
    let { page, updatePage, getBundles } = this.props

    getBundles(page + 1)
    updatePage(page + 1)
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
