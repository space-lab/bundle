import React from 'react'
import ListContainer from './../ListContainer'
import Navigation from './../Navigation'

import './style.css'

export default function App ({ children }) {
  return (
    <div className='app-container'>
      <Navigation />

      <ListContainer>
        {children}
      </ListContainer>
    </div>
  )
}
