import './index.css'

export default class Modal extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  }

  render () {
    let { children, style, className } = this.props
    let computedClassName = (className ? className + ' ' : '') + 'modal'

    return (
      <div className={computedClassName} style={style}>
        {children}
      </div>
    )
  }
}
