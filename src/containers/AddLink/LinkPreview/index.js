import ImmutablePropTypes from 'react-immutable-proptypes'
import { BundleView } from 'components'
import './index.css'

export default class LinkPreview extends React.Component {
  static propTypes = {
    link: ImmutablePropTypes.record.isRequired,
    currentUser: ImmutablePropTypes.record.isRequired,
    addLinkHandler: React.PropTypes.func.isRequired
  }

  render () {
    const { link, currentUser, addLinkHandler } = this.props
    const linkWithCreator = link
      .set('creator', currentUser.id)
      .set('created_at', link.created_at || new Date().toISOString())

    return (
      <div className='add-link-preview'>
        <BundleView.Link
          link={linkWithCreator}
          creator={currentUser}/>

        <button
          className='add-link-button'
          onClick={::this.addLinkHandler(link)}>
          Add Link
        </button>
      </div>
    )
  }
}
