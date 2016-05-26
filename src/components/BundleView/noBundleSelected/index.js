import { connect } from 'react-redux'
import { TagInput } from 'components'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state) => ({
})

const connectProps = {
  ...userAutocompleteActions
}

@connect(connectState, connectProps)
export default class NoBundleSelected extends React.Component {
  render () {
    return (
      <div>
        No Bundle Selected...
        <br/>
        <br/>
        <br/>

        <TagInput {...this.props} autocomplete={this.props.getUsers} />
      </div>
    )
  }
}
