import {lazy, Suspense} from 'react'
import {MoDrilldownExample} from '../components/drilldown-motion/MoDrilldownExample'
import {ExamplePost} from '../components/example-post/ExamplePost'

const CodePreviewLazy = lazy(() =>
  import('../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

function Home() {
  return (
    <div>
      <div id="overview">
        <h2 className="text-lg font-bold">When To Use</h2>
        <ul className="mb-4 list-disc list-inside">
          <li>
            Exploring hierarchical datasets (regions → countries → cities)
          </li>
          <li>
            Progressive disclosure of details (overview → details → metrics)
          </li>
          <li>
            Replacing separate modal/page navigation with inline transitions
          </li>
          <li>Mobile-friendly stacked navigation</li>
        </ul>
      </div>
      <div id="basic-example">
        <h2 className="text-lg font-bold mb-2">Basic Example</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MoDrilldownExample />
          <ExamplePost />
        </div>
      </div>
      <div>
        <Suspense fallback={<div className="text-sm">Loading...</div>}>
          <h2 className="text-lg font-bold mt-8 mb-2" id="usage">
            Usages
          </h2>
          <CodePreviewLazy
            code={`import React, {useEffect, useMemo} from 'react'
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

  const items: Record<'level-1' | 'level-2 | ... | level-n', DrilldownItem> = useMemo(() => {
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
        headerClasses="border-b border-gray-200 h-10 bg-gray-100"
      />
    </div>
  )
}
`}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Home
