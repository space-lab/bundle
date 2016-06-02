import Header from './Header'
import Body from './Body'

export default class Bundle extends React.Component {
  handleLinkRemove (index) {
    const { bundle, updateBundle } = this.props
    const linkId = bundle.getIn(['links', index])

    const payload = {
      links_attributes: [{id: linkId, _destroy: true }]
    }

    updateBundle(bundle.id, payload)
  }

  render () {
    let { updateBundleInfo, updateLink } = this.props

    return (
      <div className='bundle-view-wrapper'>
        <Header {...this.props}/>

        <Body
          {...this.props}
          handleChange={updateBundleInfo}
          handleLinkEdit={updateLink}
          handleLinkRemove={::this.handleLinkRemove}
        />
      </div>
    )
  }
}
