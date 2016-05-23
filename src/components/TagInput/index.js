import ui from 'redux-ui'
import { List } from 'immutable'

import { Autocomplete } from 'components'

import './index.css'

@ui({
  state: {
    emails: List(['irakli.janiashvili@gmail.com', 'viri@viri.com']),
    autoFocus: true
  }
})
export default class TagInput extends React.Component {
  addEmail (email) {
    let { ui, updateUI } = this.props
    let emails = ui.emails.push(email)

    updateUI('emails', emails)
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
      <div className='taginput'>
        {this.renderEmailList()}

        <Autocomplete
          onFinishInput={::this.addEmail}
          autoFocus={ui.autoFocus}
        />
      </div>
    )
  }
}
