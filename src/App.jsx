import React from 'react'
import FetchApi from './components/FetchApi'
import Pokemon from './components/Pokemon'

const App = () => {
  return (
    <div className='h-screen w-full px-12 py-16'>
      {/* <FetchApi /> */}
      <Pokemon />
    </div>
  )
}

export default App
