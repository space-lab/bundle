import Moment from 'moment'

export default class Date extends React.Component {
  static propTypes = {
    children: React.PropTypes.string,
    type: React.PropTypes.string
  }

  filter (date, type) {
    switch (type) {
      case 'fromNow':
        return Moment(date).fromNow()
      default:
        return date.toString()
    }
  }

  render () {
    let { children, type } = this.props
    let time = this.filter(children, type)

    return <span>{time}</span>
  }
}
