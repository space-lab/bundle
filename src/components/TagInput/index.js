import ImmutablePropTypes from 'react-immutable-proptypes'
import { List, fromJS } from 'immutable'
import ui from 'redux-ui'
import { Autocomplete } from 'components'
import './index.css'

@ui({ state: { tags: List() } })
export default class TagInput extends React.Component {
  static propTypes = {
    data: ImmutablePropTypes.list.isRequired,
    resource: ImmutablePropTypes.record.isRequired,
    getData: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired
  }

  componentWillUnmount () {
    this.props.resetData()
  }

  addTag (tag) {
    const { ui, updateUI, handleChange } = this.props
    const tags = ui.tags.push(fromJS(tag))

    handleChange(tags.toJS())
    updateUI('tags', tags)
  }

  handleTagRemoval (index) {
    const { ui, updateUI, handleChange } = this.props
    const tags = ui.tags.delete(index)

    handleChange(tags.toJS())
    updateUI('tags', tags)
  }

  getAddedIds () {
    const invitedIds = this.props.resource.shares.map(share => share.user.id)
    const invitingIds = this.props.ui.tags
      .filter(value => typeof value !== 'string')
      .map(value => value.id)

    return invitingIds.concat(invitedIds).toSet()
  }

  renderTagOrUser (tag) {
    if (typeof tag === 'string') {
      return tag
    } else {
      return <div><img src={tag.image}/>{tag.name}</div>
    }
  }

  renderTagList () {
    const { tags } = this.props.ui

    if (tags.size === 0) return null

    return (
      <div className='userlist'>
        <div className='to'>To:</div>

        {tags.map((tag, index) =>
          <div className='tag' key={index}>
            {this.renderTagOrUser(tag)}

            <i className='close'
              onClick={this.handleTagRemoval.bind(this, index)}
            />
          </div>
        )}
      </div>
    )
  }

  render () {
    return (
      <div className='taginput'>
        {this.renderTagList()}

        <Autocomplete
          autoFocus={true}
          placeholder='Enter name, or email'
          data={this.props.data}
          getData={this.props.getData}
          onInputFinish={::this.addTag}
          addedIds={this.getAddedIds()}
        />
      </div>
    )
  }
}
