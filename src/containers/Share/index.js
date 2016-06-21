import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import Selectors from 'selectors'
import * as shareActions from 'actions/Alert'

const connectState = state => ({
  user: Selectors.currentUser(state)
})

const connectProps = {
  ...shareActions
}

@connect(connectState, connectProps)
export default class ShareContainer extends React.Component {
  render () {
    return <div>viri</div>
  }
}
