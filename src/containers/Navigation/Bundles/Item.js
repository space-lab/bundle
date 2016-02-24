const APP_PATH = '../../..'

import React from 'react'
import { Date } from '../../../components'

export default function Item ({
  name,
  created_at
}) {
  return (
    <div>
      <h1>
        {name}
      </h1>
      <h2>
        Created <Date type='fromNow'>{created_at}</Date>
      </h2>
    </div>
  )
}
