import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Alert } from 'components'
import * as alertActions from 'actions/Alert'
import * as Selectors from 'selectors'

const connectProps = state => ({
  alert: Selectors.Alert.first(state)
})

const connectActions = { ...alertActions }

@connect(connectProps, connectActions)
export default class Alerts extends React.Component {
  render () {
    let { alert, removeAlert } = this.props
    if (!alert) return false

    return (
      <Alert type={alert.get('type')}
        alerts={alert.get('list')}
        removeAlert={removeAlert}
      />
    )
  }

  static propTypes = {
    alert: ImmutablePropTypes.map
  }
}
