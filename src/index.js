import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import store from './app/store'
// import { apiSlice } from './features/api/apiSlice'
import { extendedApiSlice } from './features/users/usersSlice'

import { worker } from './api/server'

// Wrap app rendering so we can wait for the mock API to initialize
async function main() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // store.dispatch(apiSlice.endpoints.getUsers.initiate())
  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

main()
