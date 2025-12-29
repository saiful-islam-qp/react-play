import React, {useEffect, useMemo} from 'react'
import {MoDrilldown, type DrilldownItem} from '../drilldown-motion/MoDrilldown'
import Comments from './Comments'

interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

export const ExamplePost: React.FC = () => {
  const [data, setData] = React.useState<IPost[]>([])
  const [postId, setPostId] = React.useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data: IPost[] = await response.json()
      setData(data)
    }
    fetchData()
  }, [])

  const items: Record<`level-${number}`, DrilldownItem> = useMemo(() => {
    return {
      'level-1': {
        component: ({goNext}) => (
          <div className="h-full bg-white flex flex-col overflow-auto">
            <h2 className="text-base border-b font-medium px-4 py-2 bg-white sticky top-0">
              Posts
            </h2>
            <div className="flex-1">
              {data.map(post => (
                <div
                  key={post.id}
                  className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    goNext('level-2', {
                      id: 'level-2',
                      title: post.title,
                    })
                    setPostId(post.id)
                  }}
                >
                  <h3 className="text-sm font-semibold">{post.title}</h3>
                  <p className="text-xs text-gray-600">
                    {post.body.substring(0, 50)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      'level-2': {
        component: () => (
          <div className="h-full bg-white overflow-auto">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <Comments id={postId!} />
              </div>
            </div>
          </div>
        ),
      },
    }
  }, [data, postId])

  return (
    <div className="h-[350px] border rounded-lg overflow-hidden bg-white border-gray-300">
      <MoDrilldown
        items={items}
        initial="level-1"
        baseTitle={{
          id: 'level-1',
          title: 'Post',
        }}
        mode="popLayout"
      />
    </div>
  )
}
