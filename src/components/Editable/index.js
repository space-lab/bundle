import ui from 'redux-ui'

@ui()
export default class Editable extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    editMode: React.PropTypes.bool.isRequired,
    enterAction: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    autoFocus: React.PropTypes.bool,
    preventDefaultOnClick: React.PropTypes.bool
  }

  componentWillMount () {
    let { onChange, value } = this.props

    if (onChange && value) {
      onChange(value)
    }
  }

  handleKeyUp ({ key, target }) {
    let { enterAction, onChange } = this.props

    if (onChange) {
      onChange(target.value)
    } else if (enterAction && key === 'Enter') {
      enterAction(target.value)
    }
  }

  onClick (event) {
    let { onClick, preventDefaultOnClick } = this.props

    preventDefaultOnClick && event.preventDefault()
    onClick && onClick(event)
  }

  render () {
    let { className, value, placeholder, editMode, type,
      autoFocus } = this.props

    let Input = type || 'input'

    if (editMode) {
      return <Input
        className={className}
        defaultValue={value || ''}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onBlur={this.props.onBlur}
        onKeyUp={this.handleKeyUp.bind(this)}
        onClick={::this.onClick} />
    } else {
      return <span
        className={className}
        onClick={::this.onClick}>
        {value}
      </span>
    }
  }
}
