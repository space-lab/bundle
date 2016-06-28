import { Header } from 'containers'
import Body from './Body'

export default class Bundle extends React.Component {
  handleLinkRemove (id) {
    const { bundle, updateBundle } = this.props

    const payload = {
      links_attributes: [{ id, _destroy: true }]
    }

    updateBundle(bundle.id, payload)
  }

  render () {
    let { updateLink } = this.props

    return (
      <div className='bundle-view-wrapper'>
        <Header {...this.props}/>

        <Body
          {...this.props}
          handleLinkEdit={updateLink}
          handleLinkRemove={::this.handleLinkRemove}
        />
      </div>
    )
  }
}
