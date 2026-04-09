import React, {useLayoutEffect} from 'react'
import * as echarts from 'echarts/core'
import {BarChart} from 'echarts/charts'
import type {BarSeriesOption} from 'echarts/charts'
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
  BarChart,
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
  categories?: string[]
  series?: BarSeriesOption[]
  handler?: (
    id: `LEVEL_${number}`,
    data?: IWuDrilldownTitle | undefined,
  ) => void
  layout: 'vertical' | 'horizontal'
}

const EChartColumn: React.FC<Props> = ({
  categories = [],
  series = [],
  handler,
  layout = 'vertical',
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Create the echarts instance
    if (!chartRef.current) return
    const myChart = echarts.init(chartRef.current)

    const xAxis = getxAxis(layout, categories)
    const yAxis = getyAxis(layout, categories)

    // Draw the chart
    myChart.setOption({
      color: CHART_COLORS,
      grid: {
        left: '3%',
        right: '3%',
        bottom: '50',
        top: '10',
      },
      tooltip: {},
      xAxis,
      yAxis,
      series: series,
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
      if (handler)
        handler(`LEVEL_2`, {
          id: `LEVEL_2`,
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

export default EChartColumn

function getxAxis(layout: 'vertical' | 'horizontal', categories: string[]) {
  if (layout === 'horizontal')
    return {
      type: 'value',
      boundaryGap: [0, 0.01],
    }

  return {
    data: categories,
    axisLine: {show: false},
  }
}

function getyAxis(layout: 'vertical' | 'horizontal', categories: string[]) {
  if (layout === 'horizontal') return {type: 'category', data: categories}
  return {
    axisLine: {show: false},
    splitLine: {lineStyle: {type: 'dashed'}},
    type: 'value',
  }
}
