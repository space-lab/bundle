import ImmutablePropTypes from 'react-immutable-proptypes'
import './index.css'

function alertContent (alerts) {
  if (alerts.size === 1) {
    return alerts
  } else {
    return <ul>{alerts.map((item, key) => <li key={key}>{item}</li>)}</ul>
  }
}

export default function Alert ({ type, alerts, removeAlert }) {
  const content = alertContent(alerts)

  return (
    <div className='alerts-container'>
      <div className={`alert alert-${type}`}>
        {content}
        <div className='close-icon' onClick={removeAlert}/>
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: React.PropTypes.string.isRequired,
  alerts: ImmutablePropTypes.list.isRequired,
  removeAlert: React.PropTypes.func.isRequired
}
