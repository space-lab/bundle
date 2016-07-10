import CollectionListItem from './Collection/CollectionListItem'
import BundleListItem from './Bundle/BundleListItem'
import './ListItem.css'

export default class ListItem extends React.Component {
  render () {
    let { Component, active } = this.props
    let activeClass = active ? ' list-item-active' : ''

    return <div className={'list-item' + activeClass}>
      <Component {...this.props} />
    </div>
  }
}

ListItem.Collection = CollectionListItem
ListItem.Bundle = BundleListItem
