import Collection from './Collection'
import Bundle from './Bundle'
import './index.css'

export default function ListItem ({
  Component,
  active,
  ...props
}) {
  return (
    <div className={'list-item' + (active ? ' list-item-active' : '')}>
      <Component {...props} />
    </div>
  )
}

ListItem.Collection = Collection
ListItem.Bundle = Bundle
