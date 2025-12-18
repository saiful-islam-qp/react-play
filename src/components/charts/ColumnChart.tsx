import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface Props {
  type?: string
  categories?: string[]
  series?: Highcharts.SeriesOptionsType[]
  handler?: (data: unknown) => void
}

export function ColumnChart({
  type = 'column',
  categories = [],
  series = [],
  handler,
}: Props) {
  const options = {
    chart: {
      type: type,
      style: {fontFamily: 'Fira Sans, sans-serif'},
      backgroundColor: 'transparent',
    },
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
            fontSize: '12px',
            color: '#282828',
            fontWeight: '400',
          },
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
              if (handler) handler(`${this.category}: ${this.series.name}`)
            },
          },
        },
      },
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
