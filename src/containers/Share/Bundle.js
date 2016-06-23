import { Editable } from 'components'
import Name from 'containers/Bundle/Body/Name'
import Description from 'containers/Bundle/Body/Description'

export default class ShareBundle extends React.Component {
  render () {
    let { user, bundle, users, links, params, location } = this.props
    console.log(bundle.name)
    return (
      <div className='bundle-view-body'>
        <Name value={bundle.name} editMode={false} />

        <Description value={bundle.description} editMode={false} />

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
