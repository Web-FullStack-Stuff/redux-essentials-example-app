import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NoPage from './components/NoPage'

import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { NotificationsList } from './features/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <AddPostForm />
                  <PostsList />
                </>
              }
            />
            <Route path='/posts/:postId' element={<SinglePostPage />} />
            <Route path='/editPost/:postId' element={<EditPostForm />} />

            <Route path='/users' element={<UsersList />}/>
            <Route path='/users/:userId' element={<UserPage />}/>

            <Route path='notifications' element={<NotificationsList />}/>
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
