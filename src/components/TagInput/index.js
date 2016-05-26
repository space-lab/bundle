import ui from 'redux-ui'
import { List } from 'immutable'

import { Autocomplete } from 'components'

import './index.css'

@ui({
  state: {
    tags: List(['irakli.janiashvili@gmail.com', 'viri@viri.com'])
  }
})
export default class TagInput extends React.Component {
  addTag (tag) {
    let { ui, updateUI } = this.props
    let tags = ui.tags.push(tag)

    updateUI('tags', tags)
  }

  handleTagRemoval (index) {
    let { ui, updateUI } = this.props
    let tags = ui.tags.delete(index)

    updateUI('tags', tags)
  }

  renderTagList () {
    let { ui } = this.props

    return ui.tags.map((tag, index) => {
      return (
        <div className='tag' key={index}>
          {tag}

          <i className='close'
            onClick={this.handleTagRemoval.bind(this, index)}
          />
        </div>
      )
    })
  }

  render () {
    return (
      <div className='taginput'>
        {this.renderTagList()}

        <Autocomplete
          placeholder='Enter name, or email'
          onFinishInput={::this.addTag}
          autoFocus={true}
          autocomplete={this.props.autocomplete}
        />
      </div>
    )
  }
}
