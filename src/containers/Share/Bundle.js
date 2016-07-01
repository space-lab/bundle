import { Link , Editable } from 'components'
import Name from 'containers/Bundle/Body/Name'
import Description from 'containers/Bundle/Body/Description'

export default class ShareBundle extends React.Component {
  render () {
    let { user, bundle, users, links, params, location } = this.props

    return (
      <div className='share-view-body'>
        <Name value={bundle.name} editMode={false} />

        <Description value={bundle.description} editMode={false} />

        {bundle.get('links').map((id, index) => {
          let link = links.get(id)
          let user = users.get(link.creator)

          return <Link
            key={index}
            url={link.url}
            image={link.image}
            title={link.title}
            description={link.description || ''}
            createdAt={link.created_at}
            creatorName={user.name}
            creatorImage={user.image}
            handleLinkRemove={handleLinkRemove.bind(this, link.id)}
          />
        })}
      </div>
    )
  }
}
