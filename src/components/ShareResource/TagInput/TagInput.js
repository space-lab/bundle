import ImmutablePropTypes from 'react-immutable-proptypes'
import { withState } from 'recompose'
import { List, fromJS } from 'immutable'
import { Autocomplete } from 'components'
import './TagInput.css'

const enhancer = withState('tags', 'updateTags', List())

class TagInput extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.list.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    getData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    tags: ImmutablePropTypes.list.isRequired,
    updateTags: React.PropTypes.func.isRequired
  }

  componentWillUnmount () {
    this.props.resetData()
  }

  addTag (tag) {
    let { tags, updateTags, handleChange } = this.props
    let newTags = tags.push(fromJS(tag))

    handleChange(newTags.toJS())
    updateTags(newTags)
  }

  handleTagRemoval (index) {
    let { tags, updateTags, handleChange } = this.props
    let newTags = tags.delete(index)

    handleChange(newTags.toJS())
    updateTags(newTags)
  }

  getAddedIds () {
    let invitedIds = this.props.resource.shares.map(share => share.user.id)
    let invitingIds = this.props.tags
      .filter(value => typeof value !== 'string')
      .map(value => value.id)

    return invitingIds.concat(invitedIds).toSet()
  }

  renderTagOrUser (tag) {
    return typeof tag === 'string'
      ? tag
      : <div><img src={tag.image}/>{tag.name}</div>
  }

  renderTagList () {
    if (this.props.tags.size === 0) return null

    return <div className='userlist'>
      <div className='to'>To:</div>

      {this.props.tags.map((tag, index) =>
        <div className='tag' key={index}>
          {this.renderTagOrUser(tag)}

          <i className='close' onClick={this.handleTagRemoval.bind(this, index)} />
        </div>
      )}
    </div>
  }

  render () {
    return <div className='taginput'>
      {this.renderTagList()}

      <Autocomplete
        autoFocus
        placeholder='Enter name, or email'
        data={this.props.data}
        getData={this.props.getData}
        onInputFinish={::this.addTag}
        addedIds={this.getAddedIds()} />
    </div>
  }
}

export default enhancer(TagInput)
