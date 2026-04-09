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
import {SENTIMENT_CHART_COLORS} from '../../constants'

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
  //   type?: string
  //   categories?: string[]
  //   series?: BarSeriesOption[]
  handler?: (data: string) => void
  //   layout: 'vertical' | 'horizontal'
}

const rawData = [
  [100, 302, 301, 334, 390, 330, 320],
  [320, 132, 101, 134, 90, 230, 210],
  [220, 182, 191, 234, 290, 330, 310],
  [150, 212, 201, 154, 190, 330, 410],
  [820, 832, 901, 934, 1290, 1330, 1320],
]
const totalData: number[] = []
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0
  for (let j = 0; j < rawData.length; ++j) {
    sum += rawData[j][i]
  }
  totalData.push(sum)
}

console.log(totalData)

const series: BarSeriesOption[] = [
  'Very Negative',
  'Negative',
  'Mixed',
  'Positive',
  'Very Positive',
].map((name, sid) => {
  return {
    name,
    type: 'bar',
    stack: 'total',
    label: {
      show: true,
      formatter: params => params.value + '%',
    },
    data: rawData[sid].map((d, did) =>
      totalData[did] <= 0 ? 0 : Math.round((d / totalData[did]) * 1000) / 10,
    ),
  }
})

const EChartBarPercentage: React.FC<Props> = ({
  //   categories = [],
  //   series = [],
  handler,
  //   layout = 'vertical',
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // Create the echarts instance
    if (!chartRef.current) return
    const myChart = echarts.init(chartRef.current)

    // Draw the chart
    myChart.setOption({
      color: SENTIMENT_CHART_COLORS,
      grid: {
        left: '3%',
        right: '3%',
        bottom: '70',
        top: '5',
      },
      tooltip: {},
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        boundaryGap: false,
      },
      yAxis: {
        type: 'category',
        data: [
          'Flight Experience',
          'Operations',
          'Booking & Pricing',
          'Baggage Handling',
          'Airport Experience',
          'Customer Support',
          'Safety & Security',
        ].reverse() as string[],
      },
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
      if (handler) handler(`${params.name}: ${params.seriesName}`)
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

export default EChartBarPercentage
