import {useLayoutEffect, useRef} from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import {CHART_COLORS} from '../../constants'
import type {DrilldownTitle} from '../DxDrillDown'

interface IProps {
  handler: (id: `level-${number}`, data?: DrilldownTitle) => void
}

function Chart({handler}: IProps) {
  const chartRef = useRef(null)

  useLayoutEffect(() => {
    if (!chartRef.current) return
    const root = am5.Root.new(chartRef.current!, {})

    // Apply custom color theme using CHART_COLORS
    const customTheme = am5.Theme.new(root)
    customTheme.rule('ColorSet').set(
      'colors',
      CHART_COLORS.map(color => am5.color(color)),
    )

    root.setThemes([am5themes_Animated.new(root), customTheme])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      }),
    )

    const data = [
      {
        category: '2021',
        europe: 23,
        namerica: 25,
        asia: 19,
        lamerica: 5,
        meast: 8,
        africa: 2.5,
      },
      {
        category: '2022',
        europe: 25.5,
        namerica: 28.5,
        asia: 22,
        lamerica: 8,
        meast: 10,
        africa: 4,
      },
      {
        category: '2023',
        europe: 28,
        namerica: 32,
        asia: 24,
        lamerica: 8.5,
        meast: 12,
        africa: 5,
      },
      {
        category: '2024',
        europe: 32,
        namerica: 37,
        asia: 28.5,
        lamerica: 11,
        meast: 15,
        africa: 6.5,
      },
      {
        category: '2025',
        europe: 33,
        namerica: 38,
        asia: 29.5,
        lamerica: 11.5,
        meast: 16,
        africa: 7.5,
      },
    ]

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    )

    // Format y-axis labels to show "m" suffix (millions)
    yAxis
      .get('renderer')
      .labels.template.adapters.add('text', (text, target) => {
        if (target && 'dataItem' in target && target.dataItem) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (target.dataItem as any).get('value')
          if (value !== undefined && value !== null) {
            return `${value}M`
          }
        }
        return text
      })

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        categoryField: 'category',
      }),
    )

    const xRenderer = xAxis.get('renderer')

    xRenderer.labels.template.setAll({
      tooltipText: '{category}',
      oversizedBehavior: 'truncate',
      maxWidth: 100,
    })

    xAxis.data.setAll(data)

    // Create series
    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Asia',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'asia',
        categoryXField: 'category',
      }),
    )
    series1.data.setAll(data)

    series1.columns.template.setAll({
      tooltipText: '{name}, {categoryX}:{valueY}M',
      width: am5.percent(70),
      tooltipY: 0,
    })
    // Log series name and category on column click
    series1.columns.template.events.on('click', ev => {
      const dataItem = ev.target.dataItem
      const dataContext = (dataItem?.dataContext || {}) as {
        category?: string
      }
      const seriesName = series1.get('name')
      const value = dataContext.category

      if (handler) {
        handler(`level-2`, {
          id: `level-2`,
          title: `${seriesName}: ${value}`,
        })
      }
    })

    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Europe',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'europe',
        categoryXField: 'category',
      }),
    )
    series2.data.setAll(data)

    series2.columns.template.events.on('click', ev => {
      const dataItem = ev.target.dataItem
      const dataContext = (dataItem?.dataContext || {}) as {
        category?: string
      }
      const seriesName = series2.get('name')
      const value = dataContext.category
      if (handler) {
        handler(`level-2`, {
          id: `level-2`,
          title: `${seriesName}: ${value}`,
        })
      }
    })

    series2.columns.template.setAll({
      tooltipText: '{name}, {categoryX}:{valueY}M',
      width: am5.percent(70),
      tooltipY: 0,
    })

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.percent(55),
      }),
    )
    legend.data.setAll(chart.series.values)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    return () => {
      root.dispose()
    }
  }, [chartRef.current])

  return <div ref={chartRef} style={{width: '100%', height: '100%'}}></div>
}
export default Chart
