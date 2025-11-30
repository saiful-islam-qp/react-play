import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface Props {}

export const LineChart: React.FC<Props> = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'spline',
      style: {
        fontFamily: 'Fira Sans, sans-serif',
      },
      backgroundColor: 'transparent',
    },
    title: {text: undefined},
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      accessibility: {
        description: 'Months of the year',
      },
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
      labels: {
        format: '{value}M',
      },
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        type: 'spline',
        name: 'EV',
        data: [
          115.2, 115.7, 116.7, 115.9, 114.2, 114.4, 115.0, 116.4, 113.8, 115.5,
          114.1, 115.6,
        ],
      },
      {
        type: 'spline',
        name: 'FMCG',
        data: [
          102.4, 103.2, 104.0, 103.8, 104.3, 105.1, 104.8, 105.6, 106.0, 105.4,
          104.9, 106.2,
        ],
      },
      {
        type: 'spline',
        name: 'Crude Oil',
        data: [
          89.5, 91.2, 90.7, 88.9, 87.5, 89.1, 90.3, 92.8, 91.4, 90.1, 89.6,
          90.9,
        ],
      },
      {
        type: 'spline',
        name: 'Electronics',
        data: [
          125.3, 124.7, 126.0, 127.5, 126.2, 125.8, 126.9, 127.3, 126.6, 128.0,
          127.1, 128.5,
        ],
      },
      {
        type: 'spline',
        name: 'Pharmaceuticals',
        data: [
          97.8, 98.2, 98.6, 99.0, 98.9, 99.4, 100.1, 100.7, 101.0, 100.5, 99.8,
          101.3,
        ],
      },
      {
        type: 'spline',
        name: 'Automobiles',
        data: [
          132.1, 133.4, 134.2, 133.8, 132.9, 134.1, 135.0, 136.5, 135.8, 134.7,
          135.3, 136.1,
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
