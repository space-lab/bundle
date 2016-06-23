import ui from 'redux-ui'
import { Editable } from 'components'

@ui()
export default class Name extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    editMode: React.PropTypes.bool.isRequired
  }

  render () {
    const { value, editMode, updateUI } = this.props

    return (
      <div className='bundle-editable-wrapper bundle-name'>
        <Editable
          value={value}
          placeholder='name goes here'
          autoFocus
          editMode={editMode}
          onChange={value => updateUI('name', value)}/>
      </div>
    )
  }
}
