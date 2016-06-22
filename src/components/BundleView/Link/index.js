import Date from 'components/Date'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { urlDomain, shouldShow } from 'helpers'
import './index.css'

export default class BundleLink extends React.Component {
  static propTypes = {
    index: React.PropTypes.number,
    editMode: React.PropTypes.bool,
    link: ImmutablePropTypes.record.isRequired,
    creator: ImmutablePropTypes.record.isRequired,
    handleLinkEdit: React.PropTypes.func,
    handleLinkRemove: React.PropTypes.func
  }

  handleEdit (link, field, { target }) {
    const { handleLinkEdit } = this.props
    handleLinkEdit(link.id, field, target.value)
  }

  handleRemoveClick () {
    const { handleLinkRemove, index } = this.props
    handleLinkRemove(index)
  }

  renderCreator (creator) {
    return (
      <div className='link-creator'>
        <img className='creator-image' src={creator.image}/>
        <span className='creator-name'>{creator.name}</span>
        <span className='shared-this'>shared this link</span>
      </div>
    )
  }

  renderDescription (link) {
    const { editMode } = this.props

    return (
      <div className='link-description'>
        <div style={shouldShow(!editMode)}>
          {link.description}
        </div>

        <input
          className='link-description-input'
          style={shouldShow(editMode)}
          type='text'
          value={link.description}
          onChange={this.handleEdit.bind(this, link, 'description')}/>
      </div>
    )
  }

  renderLinkBody (link) {
    const { editMode } = this.props

    return (
      <div className='link-body'>
        <div className='link-remove'>
          <button
            onClick={::this.handleRemoveClick}
            className='btn mod-remove-link-btn'>
            remove
          </button>
        </div>

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
              onChange={this.handleEdit.bind(this, link, 'title')}/>
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
    )
  }

  render () {
    const { link, creator, editMode } = this.props

    return (
      <div className='bundle-view-link'>
        {this.renderCreator(creator)}

        {this.renderDescription(link)}

        {this.renderLinkBody(link)}
      </div>
    )
  }
}
