import './Header.css'

export default class Header extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return <div className='header-container'>
      {this.props.children}
    </div>
  }
}
