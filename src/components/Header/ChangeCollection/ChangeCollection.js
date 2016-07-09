import ImmutablePropTypes from 'react-immutable-proptypes'
import listensToClickOutside from 'react-onclickoutside/decorator'
import ui from 'redux-ui'
import './ChangeCollection.css'
import Modal from './Modal'

@ui({
  state: { q: '', isOpen: false }
})
@listensToClickOutside()
export default class ChangeCollection extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    updateBundle: React.PropTypes.func.isRequired,
    canChangeCollection: React.PropTypes.bool.isRequired
  }

  handleClickOutside (e) {
    if (this.props.ui.isOpen) {
      this.props.updateUI('isOpen', false)
    }
  }

  openModal () {
    if (!this.props.canChangeCollection) return false

    this.props.updateUI('isOpen', true)
  }

  collectionName () {
    let { collections, bundle, canChangeCollection } = this.props
    let collectionName = collections.getIn([bundle.collection_id, 'name'])

    if (!collectionName) {
      collectionName = canChangeCollection ? 'Add To Collection' : 'No Collection Selected'
    }

    return collectionName
  }

  render () {
    return (
      <div className='change-collection-wrapper'>
        <div className='change-collection-clicker' onClick={::this.openModal}>
          <span className='icon collection-icon'></span>
          <span className='collection-name'>{::this.collectionName()}</span>
          <span className='icon down-arrow-icon'></span>
        </div>

        <Modal {...this.props} />
      </div>
    )
  }
}
