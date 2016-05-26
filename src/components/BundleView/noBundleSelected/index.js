import { connect } from 'react-redux'
import { TagInput } from 'components'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

const connectState = (state) => ({
  data: state.UserAutocomplete
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

        <TagInput
          data={this.props.data}
          getData={this.props.getAutocompleteUsers}
          resetData={this.props.resetAutocompleteUsers}
        />
      </div>
    )
  }
}
