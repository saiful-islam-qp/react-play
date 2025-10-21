import Highcharts, { Series } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  handler?: () => void;
}

function MyChartComponent({ handler }: Props) {
  const options = {
    chart: {
      type: "column",
    },
    title: null,
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe"],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      column: {
        borderRadius: "50%",
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              handler && handler();
            },
          },
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: "var(--highcharts-background-color, #ffffff)",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1990",
        data: [632, 727, 3202, 721],
      },
      {
        name: "Year 2000",
        data: [814, 841, 3714, 726],
      },
      {
        name: "Year 2021",
        data: [1393, 1031, 4695, 745],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default MyChartComponent;
