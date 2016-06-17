import Date from 'components/Date'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { urlDomain, shouldShow } from 'helpers'
import './index.css'

export default class BundleLink extends React.Component {
  static propTypes = {
    index: React.PropTypes.number.isRequired,
    editMode: React.PropTypes.bool.isRequired,
    link: ImmutablePropTypes.record.isRequired,
    creator: ImmutablePropTypes.record.isRequired,
    handleLinkEdit: React.PropTypes.func.isRequired,
    handleLinkRemove: React.PropTypes.func.isRequired
  }

  handleEdit (link, field, { target }) {
    const { handleLinkEdit } = this.props
    handleLinkEdit(link.id, field, target.value)
  }

  handleRemoveClick (event) {
    const { handleLinkRemove, index } = this.props
    handleLinkRemove(index)
  }

  renderLinkCreator (creator) {
    return (
      <div className='link-creator'>
        <img className='creator-image' src={creator.image}/>
        <span className='creator-name'>{creator.name}</span>
        <span className='shared-this'>shared this</span>
      </div>
    )
  }

  render () {
    const { link, creator, editMode } = this.props

    return (
      <div className='bundle-view-link'>
        <button style={shouldShow(editMode)}
          onClick={::this.handleRemoveClick}
          className='btn mod-remove-link-btn'>
          remove
        </button>

        {this.renderLinkCreator(creator)}

        <div className='link-description'>
          <div style={shouldShow(!editMode)}>
            {link.description}
          </div>

          <input
            className='link-description-input'
            style={shouldShow(editMode)}
            type='text'
            value={link.description}
            onChange={::this.handleEdit(link, 'description')}/>
        </div>

        <div className='link-body'>
          <div className='link-image-wrapper'>
            <img className='link-image' src={link.image}/>
          </div>

          <div className='link-details-wrapper'>
            <div className='link-title u-truncate-text'>
              <a href={link.url} target='_blank'>
                <span
                  style={shouldShow(!editMode)}
                  className='link-title u-truncate-text'>
                  {link.title}
                </span>
              </a>

              <input
                style={shouldShow(editMode)}
                type='text'
                value={link.title}
                className='link-title-input'
                onChange={::this.handleEdit(link, 'title')}/>
            </div>

            <div className='link-details-sub-wrapper'>
              <span className='link-domain'>On {urlDomain(link.url)}</span>
              <span className='dot-symbol'>•</span>
              <span className='link-created'>
                <Date type='fromNow'>{link.created_at}</Date>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
