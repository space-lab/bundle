import { BundleView, Editable } from 'components'

export default class ShareBundle extends React.Component {
  render () {
    let { user, bundle, users, links, params, location } = this.props

    return (
      <div className='bundle-view-body'>
        <BundleView.Name value={bundle.name} editMode={false} />

        <BundleView.Description value={bundle.description} editMode={false} />

        <div className='line' />

        {bundle.get('links').map((id, index) =>
          <BundleView.Link
            key={index}
            index={index}
            link={links.get(id)}
            creator={users.get(links.getIn([id, 'creator']))}
            editMode={false}
          />
        )}
      </div>
    )
  }
}
