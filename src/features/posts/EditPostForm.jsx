import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { postUpdated, selectPostById } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const post = useSelector((state) =>
    selectPostById(state, postId)
  )
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [userId, setUserId] = useState(post.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = (e) => {
    e.preventDefault()
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
          user: userId,
        }),
      )
      navigate(`/posts/${postId}`)
    }
  }

  const canSave = Boolean(title) && Boolean(content)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          {!userId && <option value={userId}>{userId}</option>}
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
    </section>
  )
}
