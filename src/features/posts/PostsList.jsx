import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

import { useGetPostsQuery } from '../api/apiSlice'

import { Spinner } from '../../components/Spinner'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">
        {post.content.substring(0, 100)} {post.content.length > 100 && ' ...'}
      </p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
/* Using memo to reduce rerendering performance */
// PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
  const {
    data: posts = [], /**We'll also want to give posts a default empty array in case it's undefined */
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  /**To avoid re-sorting on every rerender, we can do the sorting in a useMemo() hook */
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    sortedPosts.sort((a,b) => b.date.localeCompare(a.date))
    return sortedPosts 
  }, [posts])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
