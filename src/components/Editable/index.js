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
    autoFocus: React.PropTypes.bool
  }

  componentWillMount () {
    const { onChange, value } = this.props

    if (onChange && value) {
      onChange(value)
    }
  }

  handleKeyUp ({ key, target }) {
    const { enterAction, onChange } = this.props

    if (onChange) {
      onChange(target.value)
    } else if (enterAction && key === 'Enter') {
      enterAction(target.value)
    }
  }

  render () {
    let { className, value, placeholder, editMode, type,
      autoFocus, onClick } = this.props

    if (editMode) {
      if (type === 'textarea') {
        return <textarea
          className={className}
          defaultValue={value || ''}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onBlur={this.props.onBlur}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
      } else {
        return <input
          className={className}
          defaultValue={value || ''}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onBlur={this.props.onBlur}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
      }
    } else {
      return (
        <span
          className={className}
          onClick={(e) => { e.preventDefault(); return onClick(e) }}>
          {value}
        </span>
      )
    }
  }
}
