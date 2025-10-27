import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  handler?: () => void;
}

export function DonutChart({ handler }: Props) {
  const options = {
    chart: {
      type: "pie",
      style: {
        fontFamily: "Fira Sans, sans-serif",
        backgroundColor: "transparent",
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    title: null,
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.0f}%</b>",
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        borderRadius: 4,
        dataLabels: [
          {
            enabled: true,
            distance: 10,
            format: "{point.name}",
            style: {
              fontSize: "0.9em",
              fontWeight: "400",
              color: color("#100f0fff").get(),
            },
          },
          {
            enabled: true,
            distance: -20,
            format: "{point.percentage:.0f}%",
            style: {
              fontSize: "0.9em",
              fontWeight: "400",
              color: color("#fff").get(),
            },
          },
        ],
        point: {
          events: {
            click: function () {
              handler && handler();
            },
          },
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Country share",
        colorByPoint: true,
        innerSize: "75%",
        data: [
          {
            name: "Japan",
            y: 23.9,
          },
          {
            name: "India",
            y: 12.6,
          },
          {
            name: "China",
            y: 37.0,
          },
          {
            name: "Bangladesh",
            y: 5.1,
          },
          {
            name: "South Korea",
            y: 30.4,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
