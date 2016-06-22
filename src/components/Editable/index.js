import ui from 'redux-ui'

@ui()
export default class Editable extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    editMode: React.PropTypes.bool.isRequired,
    enterAction: React.PropTypes.func,
    onChange: React.PropTypes.func,
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
    const { value, placeholder, editMode, type, autoFocus } = this.props

    if (editMode) {
      if (type === 'textarea') {
        return <textarea
          defaultValue={value || ''}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
      } else {
        return <input
          defaultValue={value || ''}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
      }
    } else {
      return <span>{value}</span>
    }
  }
}
