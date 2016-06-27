import './index.css'

export default class LoadMore extends React.Component {
  static propTypes = {
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
    return (
      <button onClick={::this.onLoadMoreClicked}>
        Load More
      </button>
    )
  }
}
