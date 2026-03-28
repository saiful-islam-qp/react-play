import React from 'react'

interface IProps {
  id?: number
}

interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const Comments: React.FC<IProps> = ({id}) => {
  const [comments, setComments] = React.useState<IComment[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!id) return
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        )
        const data: IComment[] = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments().finally(() => setIsLoading(false))
  }, [id])

  return (
    <div className="px-4">
      <h2 className="text-base font-medium sticky top-0 bg-white pb-1 border-b">
        Comments
      </h2>
      <div className="space-y-4 overflow-auto h-full py-2">
        {isLoading && <p>Loading comments...</p>}
        {comments.map(comment => (
          <div key={comment.id} className="border-b pb-2">
            <h3 className="text-sm font-semibold">{comment.name}</h3>
            <p className="text-xs text-gray-600 mb-1">{comment.email}</p>
            <p className="text-sm">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
