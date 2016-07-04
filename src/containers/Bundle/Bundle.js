import { Header } from 'containers'
import Body from './Body'

export default class Bundle extends React.Component {
  render () {
    return <div className='bundle-view-wrapper'>
      <Header {...this.props}/>
      <Body {...this.props} />
    </div>
  }
}
