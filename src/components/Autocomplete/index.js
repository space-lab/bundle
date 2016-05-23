import ui from 'redux-ui'
import { List } from 'immutable'

import './index.css'

@ui({
  state: {
    emails: List(['irakli.janiashvili@gmail.com', 'viri@viri.com'])
  }
})
export default class Autocomplete extends React.Component {
  getInput = () => this.refs.input
  getInputValue = () => this.getInput().value
  setInputValue = (value) => this.getInput().value = value
  resetInput = () => this.setInputValue('')

  addEmail (email) {
    let { ui, updateUI } = this.props
    let emails = ui.emails.push(email)

    updateUI('emails', emails)
    this.resetInput()
  }

  handleKeyUp (event) {
    let { key, target: { value } } = event
    if (value.length < 5) return //TODO validate

    switch (key) {
      case 'Enter':
        return this.addEmail(value)
      case ',':
        return this.addEmail(value.slice(0, -1))
    }
  }

  handleEmailRemove (index) {
    let { ui, updateUI } = this.props
    let emails = ui.emails.delete(index)

    updateUI('emails', emails)
  }

  renderEmailList () {
    let { ui } = this.props

    return ui.emails.map((email, index) => {
      return (
        <div className='tag' key={index}>
          {email}

          <i className='close'
            onClick={this.handleEmailRemove.bind(this, index)}
          />
        </div>
      )
    })
  }

  render () {
    let { ui } = this.props

    return (
      <div className='autocomplete'>
        {this.renderEmailList()}

        <input
          ref='input'
          type='text'
          onKeyUp={::this.handleKeyUp}
          autoFocus={ui.autoFocus}
        />
      </div>
    )
  }
}
