import React from 'react'
import SimpleLevel from '../simple-level/SimpleLevel'
import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

interface Props {
  headerClasses?: string
}

const SimpleExample: React.FC<Props> = ({headerClasses}) => {
  return (
    <div className="h-[350px] md:h-full border rounded-lg bg-white overflow-hidden border-gray-300">
      <WuDrilldown
        initial="LEVEL_1"
        baseTitle={{id: 'LEVEL_1', title: 'BASE_TITLE'}}
        offsetHeight={42}
        items={{
          LEVEL_1: {
            component: (ctx: IWuDrilldownContext) => (
              <SimpleLevel
                title="Level 1 title"
                content="This is level 1"
                goNext={() =>
                  ctx.goNext(`LEVEL_2`, {
                    id: `LEVEL_2`,
                    title: `Where you clicked in Level 1`,
                  })
                }
                showHeader
              />
            ),
          },
          LEVEL_2: {
            component: (ctx: IWuDrilldownContext) => (
              <SimpleLevel
                title="Level 2"
                content="This is level 2"
                goNext={() =>
                  ctx.goNext(`LEVEL_3`, {
                    id: `LEVEL_3`,
                    title: `Where you clicked in level 2`,
                  })
                }
              />
            ),
          },
          LEVEL_3: {
            component: () => (
              <SimpleLevel
                title="Level 3"
                content="This is level 3"
                isNextDisabled
              />
            ),
          },
        }}
        headerClasses={headerClasses ? headerClasses : ''}
      />
    </div>
  )
}

export default SimpleExample
