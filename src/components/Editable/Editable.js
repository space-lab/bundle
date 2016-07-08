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
    autoFocus: React.PropTypes.bool,
    preventDefaultOnClick: React.PropTypes.bool
  }

  state = { value: '' }

  componentWillMount () {
    let { onChange, value } = this.props
    this.setState({ value })

    if (onChange && value) onChange(value)
  }

  componentWillReceiveProps ({ value }) {
    this.setState({ value })
  }

  handleChange ({ key, target }) {
    let { enterAction, onChange } = this.props
    this.setState({ value: target.value })

    if (onChange) {
      onChange(target.value)
    } else if (enterAction && key === 'Enter') {
      enterAction(target.value)
    }
  }

  render () {
    let { className, placeholder, editMode, type, autoFocus } = this.props

    let Input = type || 'input'

    if (editMode) {
      return <Input
        className={className}
        value={this.state.value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={::this.handleChange}
        onBlur={this.props.onBlur} />
    } else {
      return <span className={className}>
        {this.state.value}
      </span>
    }
  }
}
