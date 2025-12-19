import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type {DrilldownTitle} from '../DxDrillDown'
import React from 'react'

interface Props {
  handler?: (id: `level-${number}`, data?: DrilldownTitle) => void
}

export function DonutChart({handler}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      style: {fontFamily: 'Fira Sans, sans-serif'},
      backgroundColor: 'transparent',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    title: {text: undefined},
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>',
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 4,
        dataLabels: [
          {
            enabled: true,
            distance: 10,
            format: '{point.name}',
            style: {
              fontSize: '0.9em',
              fontWeight: '400',
              color: '#100f0f',
            },
          },
          {
            enabled: true,
            distance: -20,
            format: '{point.percentage:.0f}%',
            style: {
              fontSize: '0.9em',
              fontWeight: '400',
              color: '#ffffff',
            },
          },
        ],
        point: {
          events: {
            click: function (this: Highcharts.Point, event) {
              event.preventDefault()
              if (handler)
                handler(`level-3`, {
                  id: 'level-3',
                  title: `${this.series.name}: ${this.name}`,
                  nodeRef: React.createRef<HTMLHeadingElement | null>(),
                })
            },
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Sales by country',
        innerSize: '75%',
        data: [
          {name: 'Japan', y: 23.9},
          {name: 'India', y: 12.6},
          {name: 'China', y: 37.0},
          {name: 'Bangladesh', y: 5.1},
          {name: 'South Korea', y: 30.4},
        ],
      },
    ],
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
