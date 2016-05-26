import './index.css'

export default class Autocomplete extends React.Component {
  static propTypes = {
    autoFocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    //data: React.PropTypes.array, TODO
    getData: React.PropTypes.func.isRequired,
    onFinishInput: React.PropTypes.func.isRequired
  }

  getInput = () => this.refs.input
  getInputValue = () => this.getInput().value
  setInputValue = (value) => this.getInput().value = value
  resetInput = () => this.setInputValue('')

  sendValue (value) {
    if (value) {
      this.props.onFinishInput(value)
      this.resetInput()
    }
  }

  onKeyUp (event) {
    let { key, target: { value } } = event

    switch (key) {
      case 'Enter':
        return this.sendValue(value)
      case ',':
        return this.sendValue(value.slice(0, -1))
      default:
        return this.props.getData(value)
    }
  }

  renderAutocompleteList () {
    return this.props.data.map((entry) => {
      return <div className='list'>
        {entry.name}
      </div>
    })
  }

  render () {
    return (
      <div className='autocomplete'>
        <input
          ref='input'
          type='text'
          placeholder={this.props.placeholder}
          onKeyUp={::this.onKeyUp}
          autoFocus={this.props.autoFocus}
        />

        {this.renderAutocompleteList()}
      </div>
    )
  }
}
