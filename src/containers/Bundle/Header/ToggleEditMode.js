import { shouldShow } from 'helpers'

export default class ToggleEditMode extends React.Component {
  static propTypes = {
    editMode: React.PropTypes.bool,
    toggleEdit: React.PropTypes.func
  }

  render () {
    let { toggleEdit, editMode } = this.props

    return (
      <div className='toggle-btn-wrapper'>
        <button
          style={shouldShow(!editMode)}
          className='button'
          onClick={toggleEdit.bind(this, false)}
        >
          Edit
        </button>

        <button
          style={shouldShow(editMode)}
          className='button'
          onClick={toggleEdit.bind(this, true)}
        >
          Save
        </button>
      </div>
    )
  }
}
