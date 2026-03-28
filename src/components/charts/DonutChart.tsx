import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {CHART_COLORS} from '../../constants'
import type {IWuDrilldownTitle} from '@npm-questionpro/wick-ui-lib'

interface Props {
  handler?: (
    id: `LEVEL_${number}`,
    data?: IWuDrilldownTitle | undefined,
  ) => void
}

export function DonutChart({handler}: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      style: {fontFamily: 'Fira Sans, sans-serif'},
      backgroundColor: 'transparent',
    },
    colors: CHART_COLORS,
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
                handler(`LEVEL_3`, {
                  id: 'LEVEL_3',
                  title: `${this.series.name}: ${this.name}`,
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
          {name: 'France', y: 33.9},
          {name: 'Germany', y: 92.6},
          {name: 'Italy', y: 37.0},
          {name: 'Spain', y: 15.1},
          {name: 'Portugal', y: 13.4},
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
