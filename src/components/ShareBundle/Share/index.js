import ImmutablePropTypes from 'react-immutable-proptypes'
import './index.css'

export default class Share extends React.Component {
  static propTypes = {
    share: ImmutablePropTypes.record,
  }

  permissionChanged (e) {
    console.log(e.target)
  }

  renderPermission () {
    let selected = this.props.share.permission
    let options = [
      { id: 1, name: 'View' },
      { id: 2, name: 'Edit' }
    ]

    return (
      <select value={selected.get('id')} onChange={::this.permissionChanged}>
        {options.map(item => {
          return <option value={item.id} key={item.id}>{item.name}</option>
        })}
      </select>
    )
  }

  render () {
    let share = this.props.share

    return (
      <div className='share-list-item'>
        <div className='user-avatar'>
          <img src={share.user.image} />
        </div>

        <div className='user-information'>
          {share.user.name} / {share.user.email}
        </div>

        <div className='user-permission'>
          {::this.renderPermission()}
        </div>
      </div>
    )
  }
}
