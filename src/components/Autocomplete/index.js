import './index.css'

export default class Autocomplete extends React.Component {
  static propTypes = {
    autoFocus: React.PropTypes.bool,
    onFinishInput: React.PropTypes.func.isRequired
  }

  getInput = () => this.refs.input
  getInputValue = () => this.getInput().value
  setInputValue = (value) => this.getInput().value = value
  resetInput = () => this.setInputValue('')

  sendValue (value) {
    this.props.onFinishInput(value)
    this.resetInput()
  }

  onKeyUp (event) {
    let { key, target: { value } } = event

    switch (key) {
      case 'Enter':
        return this.sendValue(value)
      case ',':
        return this.sendValue(value.slice(0, -1))
    }
  }

  render () {
    return (
      <div className='autocomplete'>
        <input
          ref='input'
          type='text'
          onKeyUp={::this.onKeyUp}
          autoFocus={this.props.autoFocus}
        />
      </div>
    )
  }
}
