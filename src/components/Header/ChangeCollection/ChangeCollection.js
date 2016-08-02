import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, withState } from 'recompose'
import listensToClickOutside from 'react-onclickoutside'
import './ChangeCollection.css'
import Modal from './Modal'

let enhancer = compose(
  withState('query', 'updateQuery', ''),
  withState('isOpen', 'updateOpen', false),
  listensToClickOutside,
)

class ChangeCollection extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    updateBundle: React.PropTypes.func.isRequired,
    canChangeCollection: React.PropTypes.bool.isRequired,
    query: React.PropTypes.string.isRequired,
    updateQuery: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    updateOpen: React.PropTypes.func.isRequired
  }

  handleClickOutside () {
    if (this.props.isOpen) this.props.updateOpen(false)
  }

  openModal () {
    if (!this.props.canChangeCollection) return false

    this.props.updateOpen(true)
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
    return <div className='change-collection-wrapper'>
      <div className='change-collection-clicker' onClick={::this.openModal}>
        <span className='icon collection-icon'></span>
        <span className='collection-name'>{::this.collectionName()}</span>
        <span className='icon down-arrow-icon'></span>
      </div>

      <Modal {...this.props} />
    </div>
  }
}

export default enhancer(ChangeCollection)
