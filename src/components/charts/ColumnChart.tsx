import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Props {
  handler?: (data: unknown) => void;
}

export function ColumnChart({ handler }: Props) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      style: { fontFamily: "Fira Sans, sans-serif" },
      backgroundColor: "transparent",
    },
    title: { text: undefined },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe"],
      title: { text: undefined },
      gridLineWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Sales (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
      gridLineWidth: 1,
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
            color: "#282828",
            fontWeight: "400",
          },
        },
        groupPadding: 0.125,
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function (this: Highcharts.Point, event) {
              event.preventDefault();
              if (handler) handler(`${this.category}  ${this.series.name}`);
            },
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "column",
        name: "Year 2023",
        data: [632, 727, 3202, 721],
      },
      {
        type: "column",
        name: "Year 2024",
        data: [814, 841, 3714, 726],
      },
      {
        type: "column",
        name: "Year 2025",
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
