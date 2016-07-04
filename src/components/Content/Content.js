import './Content.css'

export default class Content extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render () {
    return <div className='bundle-view-wrapper'>
      {this.props.children}
    </div>
  }
}
