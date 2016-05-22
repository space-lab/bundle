import { shouldShow } from 'helpers'

export default function ToggleBundleButton ({ toggleEdit, editMode }) {
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

ToggleBundleButton.propTypes = {
  editMode: React.PropTypes.bool,
  toggleEdit: React.PropTypes.func
}
