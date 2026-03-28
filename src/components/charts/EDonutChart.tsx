import React, {useLayoutEffect} from 'react'
import * as echarts from 'echarts/core'
import {PieChart} from 'echarts/charts'
import type {PieSeriesOption} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components'
import {LabelLayout, UniversalTransition} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'

import {CHART_COLORS} from '../../constants'
import type {IWuDrilldownTitle} from '@npm-questionpro/wick-ui-lib'

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

interface Props {
  type?: string
  series?: PieSeriesOption[]
  handler?: (
    id: `LEVEL_${number}`,
    data?: IWuDrilldownTitle | undefined,
  ) => void
}

const EDonutChart: React.FC<Props> = ({handler}) => {
  const chartRef = React.useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Create the echarts instance
    if (!chartRef.current) return
    const myChart = echarts.init(chartRef.current)

    // Draw the chart
    myChart.setOption({
      color: CHART_COLORS,
      tooltip: {trigger: 'item'},
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            {value: 1048, name: 'Search Engine'},
            {value: 735, name: 'Direct'},
            {value: 580, name: 'Email'},
            {value: 484, name: 'Union Ads'},
            {value: 300, name: 'Video Ads'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
      textStyle: {
        fontFamily: 'Fira Sans, sans-serif',
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
      },
    })
    myChart.on('click', function (params) {
      console.log('Clicked on', params)
      if (handler)
        handler(`LEVEL_3`, {
          id: `LEVEL_3`,
          title: `${params.name}: ${params.seriesName}`,
        })
    })

    const observer = new ResizeObserver(() => {
      myChart.resize()
    })
    observer.observe(myChart.getDom())

    return () => {
      myChart.dispose()
      observer.disconnect()
    }
  }, [])
  return <div ref={chartRef} style={{width: '100%', height: '100%'}}></div>
}

export default EDonutChart
