import ImmutablePropTypes from 'react-immutable-proptypes'
import { Modal } from 'components'
import './index.css'

export default class ChangeCollectionModal extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record.isRequired,
    collections: ImmutablePropTypes.map.isRequired,
    updateBundle: React.PropTypes.func.isRequired, query: React.PropTypes.string.isRequired, updateQuery: React.PropTypes.func.isRequired
  }

  onQueryChange (e) {
    this.props.updateQuery(e.target.value)
  }

  onItemClick (collection) {
    let { bundle, updateBundle } = this.props

    collection.id === bundle.collection_id
      ? updateBundle(bundle.id, { collection_id: null })
      : updateBundle(bundle.id, { collection_id: collection.id })
  }

  onCloseClick () {
    this.props.updateQuery('')
  }

  currentCollection () {
    return this.props.collections.get(this.props.bundle.collection_id)
  }

  currentCollectionId () {
    return this.props.collections.getIn([this.props.bundle.collection_id, 'id'])
  }

  filteredCollections () {
    const currentId = this.currentCollectionId()
    const q = this.props.query.toLowerCase()

    return this.props.collections.toList().filter(item =>
      item.id !== currentId && item.name.toLowerCase().includes(q))
  }

  renderItem (item, isCurrent) {
    const checkIcon = isCurrent
      ? <div className='icon collection-check-icon'/>
      : null

    return (
      <div key={item.id}
        className={'item ' + (isCurrent ? 'current' : '')}
        onClick={() => this.onItemClick(item)}>

        <span>{item.name}</span>
        {checkIcon}
      </div>
    )
  }

  renderItems (current, collections) {
    return (
      <div className='search-results'>
        {current && this.renderItem(current, true)}
        {collections.map(item => this.renderItem(item))}
      </div>
    )
  }

  renderNoResult () {
    return <div className='no-results'>No collections were found...</div>
  }

  renderSearchResults () {
    const current = this.currentCollection()
    const filteredCollections = this.filteredCollections()

    return current || filteredCollections.size > 0
      ? this.renderItems(current, filteredCollections)
      : this.renderNoResult()
  }

  render () {
    if (!this.props.isOpen) return false

    return <Modal className='change-collection-modal'>
      <div className='search-container'>
        <input type='text'
          className='search-input'
          placeholder='Search Collections...'
          value={this.props.query}
          onChange={::this.onQueryChange}/>

        <span className='icon close-icon'
          onClick={::this.onCloseClick}/>
      </div>

      {this.renderSearchResults()}
    </Modal>
  }
}
