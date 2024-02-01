import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import style from "./linechart.module.css"
import {
  getInvestByMonth,
  getMonthsArray,
  getValueByMonth,
} from "../../utils/functions";
import { LineChartProps } from "../../utils/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function LineChart({ tableData, trades }: LineChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [valueByMonth, setValueByMonth] = useState<number[]>([]);
  const [investByMonth, setInvestByMonth] = useState<number[]>([]);

  useEffect(() => {
    setLabels(getMonthsArray(trades));
    setValueByMonth(getValueByMonth(tableData));
    setInvestByMonth(getInvestByMonth(tableData));
  }, [tableData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio value",
        data: valueByMonth,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Invested amount",
        data: investByMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(screen)

  return (
    <div className={style.div}>
      <Line data={data} options={{maintainAspectRatio: false}} />
    </div>
  )
}
