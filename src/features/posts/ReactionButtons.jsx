import { useAddNewPostMutation } from '../api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddNewPostMutation()

  

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reactionName, emoji]) => {
      return (
        <button
          key={reactionName}
          type="button"
          className="muted-button reaction-button"
          onClick={() => {
            console.log(post)
            addReaction({ postId: post.id, reaction: reactionName })
          }}
        >
          {emoji} {post.reactions[reactionName]}
        </button>
      )
    },
  )

  return <div>{reactionButtons}</div>
}
