import React, { Component, PropTypes } from 'react'

import { shouldShow } from '../../../../helpers'

export default function BundleName ({ name , editMode, handleChange }) {
  return (
    <div className='bundle-name-wrapper'>

      <h2 style={shouldShow(!editMode)} className='bundle-name'>{name}</h2>

      <input style={shouldShow(editMode)} className='bundle-name-input'
        type='text' value={name}
        onChange={(e) => handleChange('name', e.target.value)} />

    </div>
  )
}

BundleName.propTypes = {
  name: PropTypes.string,
  editMode: PropTypes.bool,
  handleChange: PropTypes.func
}
