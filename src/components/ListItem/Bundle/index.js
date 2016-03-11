import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Editable, Date, ListToolbar } from './../..'

export default function BundleListItem ({
  name,
  created_at,
  url,
  editMode,
  rename,
  id,
  ...toolbarProps
}) {
  return (
    <div>
      <ListToolbar id={id} editMode={editMode} {...toolbarProps} />

      <Link to={url}>
        <h1>
          <Editable id={id} editMode={editMode} value={name}
            enterAction={rename} />
        </h1>
        <h2>
          Created <Date type='fromNow'>{created_at}</Date>
        </h2>
      </Link>
    </div>
  )
}

BundleListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  //created_at: PropTypes.string.isRequred, # TODO causes weird warning
  url: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  rename: PropTypes.func.isRequired
}
