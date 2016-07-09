import ImmutablePropTypes from 'react-immutable-proptypes'
import './Autocomplete.css'

export default class Autocomplete extends React.Component {
  static propTypes = {
    autoFocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    data: ImmutablePropTypes.list.isRequired,
    getData: React.PropTypes.func.isRequired,
    onInputFinish: React.PropTypes.func.isRequired,
    addedIds: ImmutablePropTypes.set.isRequired
  }

  getInput = () => this.refs.input
  getInputValue = () => this.getInput().value
  setInputValue = (value) => this.getInput().value = value
  resetInput = () => this.setInputValue('')

  sendValue (entry) {
    if (entry && !this.alreadyAdded(entry.id)) {
      this.props.onInputFinish(entry)
      this.resetInput()
    }
  }

  alreadyAdded (id) {
    return this.props.addedIds.includes(id)
  }

  handleOnKeyUp (event) {
    const { key, target: { value } } = event

    switch (key) {
      case 'Enter':
        return this.sendValue(value)
      case ',':
        return this.sendValue(value.slice(0, -1))
    }
  }

  handleOnChange () {
    const value = this.getInputValue()
    return this.props.getData(value)
  }

  renderAutocompleteList () {
    return (
      <div className='list'>
        {this.props.data.map((entry) => {
          const className = 'item' + (this.alreadyAdded(entry.id) ? ' active' : '')

          return (
            <div
              key={entry.id}
              className={className}
              onClick={this.sendValue.bind(this, entry)}>
              <img src={entry.image}/>

              <span>{entry.name}</span>

              {this.alreadyAdded(entry.id)
                ? <div className='check-icon' />
                : null
              }
            </div>
          )
        })}
      </div>
    )

  }

  render () {
    return (
      <div className='autocomplete'>
        <input
          ref='input'
          type='text'
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
          onKeyUp={::this.handleOnKeyUp}
          onChange={::this.handleOnChange}
        />

        {this.renderAutocompleteList()}
      </div>
    )
  }
}
