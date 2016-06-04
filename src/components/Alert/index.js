import ImmutablePropTypes from 'react-immutable-proptypes'
import './index.css'

export default class Alert extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    alerts: ImmutablePropTypes.list.isRequired,
    removeAlert: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    setTimeout(this.props.removeAlert, 5000)
  }

  renderContent (alerts) {
    if (alerts.size === 1) {
      return alerts
    } else {
      return <ul>{alerts.map((item, key) => <li key={key}>{item}</li>)}</ul>
    }
  }

  render () {
    const { type, alerts, removeAlert } = this.props

    return (
      <div className='alerts-container'>
        <div className={`alert alert-${type}`}>
          {this.renderContent(alerts)}
          <div className='close-icon' onClick={removeAlert}/>
        </div>
      </div>
    )
  }
}

