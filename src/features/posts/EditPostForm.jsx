import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice'

export const EditPostForm = () => {
  const { postId } = useParams()

  const {data: post} = useGetPostQuery(postId)
  const [updatePost, {isLoading}] = useEditPostMutation()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const navigate = useNavigate()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const onSavePostClicked = async (e) => {
    e.preventDefault()
    if (title && content) {
      await updatePost({id: postId, title, content})
      navigate(`/posts/${postId}`)
    }
  }

  const canSave = Boolean(title) && Boolean(content)



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
