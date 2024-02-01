import { DataTableProps, TableData } from "../../utils/types";
import style from "./datatable.module.css";

export default function DataTable({ tableData }: DataTableProps ) {

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Date (Y/M/D)</th>
          <th>BTC price</th>
          <th>Total invested</th>
          <th>Portfolio value</th>
          <th>Variation(CLP)</th>
          <th>Variation(%)</th>
        </tr>
      </thead>
      <tbody>
          {tableData.map((value: TableData) => {
            return (
              <tr key={value.date}>
                <td>{value.orderNumber}</td>
                <td>{value.date}</td>
                <td>{value.BTCPrice}</td>
                <td>{value.investedAmount}</td>
                <td>{value.portfolioValue}</td>
                <td className={value.valueChange > 0 ? style.greater : style.lesser}>{value.valueChange == 0 ? "" : value.valueChange > 0 ? "+" : ""}{value.valueChange}</td>
                <td className={value.percentageChange > 0 ? style.greater : style.lesser}>{value.percentageChange == 0 ? "" : value.percentageChange > 0 ? "+" : ""}{value.percentageChange}%</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
