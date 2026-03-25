import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {useLayoutEffect} from 'react'
import {CHART_COLORS} from '../../constants'
import type {IWuDrilldownTitle} from '@npm-questionpro/wick-ui-lib'

interface Props {
  type?: string
  categories?: string[]
  series?: Highcharts.SeriesOptionsType[]
  handler?: (id: `LEVEL_${number}`, data?: IWuDrilldownTitle) => void
}

export function ColumnChart({
  type = 'column',
  categories = [],
  series = [],
  handler,
}: Props) {
  useLayoutEffect(() => {}, [])
  const options = {
    chart: {
      type: type,
      style: {fontFamily: 'Fira Sans, sans-serif'},
      backgroundColor: 'transparent',
    },
    colors: CHART_COLORS,

    title: {text: undefined},
    xAxis: {
      categories: categories,
      title: {text: undefined},
      gridLineWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Sales (millions)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
      gridLineWidth: 1,
    },
    tooltip: {
      valueSuffix: ' millions',
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            color: '#282828',
            fontWeight: '400',
          },
          align: 'center',
          y: 25,
        },
        groupPadding: 0.125,
      },
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function (
              this: Highcharts.Point,
              event: Highcharts.PointClickEventObject,
            ) {
              event.preventDefault()
              if (handler)
                handler(`LEVEL_2`, {
                  id: `LEVEL_2`,
                  title: `${this.category}: ${this.series.name}`,
                })
            },
          },
        },
      },
      dataLabels: [{enabled: true, inside: true}],
    },
    credits: {
      enabled: false,
    },
    series: series,
  }

  return (
    <div style={{height: '100%', width: '100%'}}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{style: {height: '100%', width: '100%'}}}
      />
    </div>
  )
}
