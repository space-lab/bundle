import './Content.css'

export default class Content extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return <div className='bundle-view-wrapper'>
      {this.props.children}
    </div>
  }
}
