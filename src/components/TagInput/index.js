import ImmutablePropTypes from 'react-immutable-proptypes'
import { List, fromJS } from 'immutable'
import ui from 'redux-ui'
import { Autocomplete } from 'components'
import './index.css'

@ui({ state: { tags: List() } })
export default class TagInput extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.list.isRequired,
    getData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired
  }

  componentWillUnmount () {
    this.props.resetData()
  }

  addTag (tag) {
    let { ui, updateUI, handleChange } = this.props
    let tags = ui.tags.push(fromJS(tag))

    handleChange(tags.toJS())
    updateUI('tags', tags)
  }

  handleTagRemoval (index) {
    let { ui, updateUI, handleChange } = this.props
    let tags = ui.tags.delete(index)

    handleChange(tags.toJS())
    updateUI('tags', tags)
  }

  getAddedIds () {
    return this.props.ui.tags
      .filter(value => typeof value !== 'string')
      .map(value => value.id)
  }

  renderTagOrUser (tag) {
    if (typeof tag === 'string') {
      return tag
    } else {
      return <div><img src={tag.image} /> {tag.name}</div>
    }
  }

  renderTo () {
    return this.props.ui.tags.size !== 0 ? <div className='to'>To:</div> : null
  }

  renderTagList () {
    let { ui } = this.props

    return ui.tags.map((tag, index) => {
      return (
        <div className='tag' key={index}>
          {this.renderTagOrUser(tag)}

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
        {this.renderTo()}
        {this.renderTagList()}

        <Autocomplete
          autoFocus={true}
          placeholder='Enter name, or email'
          data={this.props.data}
          getData={this.props.getData}
          onFinishInput={::this.addTag}
          addedIds={this.getAddedIds()}
        />
      </div>
    )
  }
}
