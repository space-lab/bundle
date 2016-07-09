import { Bundle, Link , Editable } from 'components'

export default class ShareBundle extends React.Component {
  render () {
    let { user, bundle, users, links, params, location } = this.props

    return <Bundle className='share-view-body'>
      <span className='bundle-name'>{bundle.name}</span>
      <span className='bundle-description'>{bundle.description}</span>

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
          canRemove={false} />
      })}
    </Bundle>
  }
}
