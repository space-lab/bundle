import './index.css'

export default class Menu extends React.Component {
  renderHeadline (headline) {
    if (headline) {
      return (
        <div className='headline'>
          <span>{headline}</span>
          <hr />
        </div>
      )
    }
  }

  render () {
    let { headline, children } = this.props

    return (
      <div className='menu'>
        {this.renderHeadline(headline)}

        {children}
      </div>
    )
  }

  static propTypes = {
    headline: React.PropTypes.string
  }
}
