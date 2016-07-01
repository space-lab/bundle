import ImmutablePropTypes from 'react-immutable-proptypes'
import Name from './Name'
import Description from './Description'
import { Link, BundleView } from 'components'
import { AddLink } from 'containers'
import './index.css'

export default class BundleViewBody extends React.Component {
  static propTypes = {
    ui: React.PropTypes.object.isRequired,
    bundle: ImmutablePropTypes.record.isRequired,
    users: ImmutablePropTypes.map.isRequired,
    links: ImmutablePropTypes.map.isRequired,
    currentLink: ImmutablePropTypes.record,
    handleLinkEdit: React.PropTypes.func.isRequired,
    handleLinkRemove: React.PropTypes.func.isRequired
  }

  render () {
    let {
      ui,
      bundle,
      users,
      links,
      currentLink,
      handleLinkEdit,
      handleLinkRemove
    } = this.props

    return (
      <div className='bundle-view-body'>
        <Name value={bundle.name} editMode={ui.editMode}/>

        <Description value={bundle.description} editMode={ui.editMode}/>

        <AddLink bundle={bundle} currentLink={currentLink} links={links}/>

        {bundle.get('links').map((id, index) => {
          let link = links.get(id)
          let user = users.get(link.creator)

          return <link
            key={index}
            url={link.url}
            image={link.image}
            title={link.title}
            description={link.description}
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
