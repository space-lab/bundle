import ui from 'redux-ui'
import { List } from 'immutable'

import './index.css'

@ui({
  state: {
    emails: List(['irakli.janiashvili@gmail.com', 'viri@viri.com'])
  }
})
export default class Autocomplete extends React.Component {
  resetInput () {
    this.refs.input.value = ''
  }

  handleEmailAddition (event) {
    let { ui, updateUI } = this.props
    let { key, target: { value } } = event

    if (key !== ',') return

    let email = value.slice(0, -1)
    let emails = ui.emails.push(email)

    updateUI('emails', emails)
    this.resetInput()
  }

  handleEmailRemove (index) {
    let { ui, updateUI } = this.props
    let emails = ui.emails.delete(index)

    updateUI('emails', emails)
  }

  render () {
    let { ui } = this.props

    return (
      <div className='autocomplete'>
        {ui.emails.map((email, index) => {
          return (
            <div className='tag' key={index}>
              {email}
              <i className='close' onClick={this.handleEmailRemove.bind(this, index)}/>
            </div>
          )
        })}

        <input ref='input' type='text' onKeyUp={::this.handleEmailAddition} />
      </div>
    )
  }
}
