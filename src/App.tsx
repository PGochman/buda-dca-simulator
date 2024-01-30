import "./App.css";
import { useState, useEffect } from "react";
import DateInput from "./components/dataInput/DataInput.tsx";
import { Entry, Info, TableData } from "./utils/types.ts";
import DataTable from "./components/dataTable/DataTable.tsx";
import {
  getDates,
  getTradeInfo,
  getTodayInfo,
  getTableData,
} from "./utils/functions.ts";
import LineChart from "./components/linechart/LineChart.tsx";
import style from "./app.module.css";
import InvestmentProfit from "./components/investmentProfit/InvestmentProfit.tsx";

function App() {
  const { year, month } = getTodayInfo();

  const defaultFinalDate = `${year}-${month}-01`;
  const defaulInitialDate = `${year - 1}-${month}-01`;

  const [info, setInfo] = useState<Info>({
    initialDate: defaulInitialDate,
    finalDate: defaultFinalDate,
    amount: 10000,
  });

  const [trades, setTrades] = useState<Entry[]>([]);
  const [numberOfDates, setNumberOfDates] = useState<number>();
  const [tableValues, setTableValues] = useState<TableData[]>([]);

  useEffect(() => {
    getMonthlyRevenue();
  }, [info]);

  useEffect(() => {
    setTableValues(getTableData(trades, info.amount));
  }, [trades]);

  const getMonthlyRevenue = async () => {
    setTrades([]);
    const dates = getDates({
      initialDate: info.initialDate,
      finalDate: info.finalDate,
    });
    setNumberOfDates(dates.length);
    dates.forEach(async (date) => {
      getTradeInfo(date).then((data) => {
        if (data) setTrades((trades: Entry[]) => [...trades, data]);
      });
    });
  };

  const handleInfoChange = (info: Info) => {
    setInfo(info);
  };

  return (
    <div className={style.container}>
      <h1>DCA BTC-CLP Simulator</h1>
      <h5>BTC-CLP DCA Simulator. Simulates monthly investments between the indicated dates.</h5>
      <div className={style.inputTable}>
        <div className={style.moneyDiv}>
          <DateInput
            handleInfoChange={handleInfoChange}
            price={info.amount}
            initialDate={info.initialDate}
            finalDate={info.finalDate}
          />
          <InvestmentProfit
            investedAmount={tableValues.at(-1)?.investedAmount}
            profit={tableValues.at(-1)?.valueChange}
            percentage={tableValues.at(-1)?.percentageChange}
            portfolioValue={tableValues.at(-1)?.portfolioValue}
          />
        </div>
        {tableValues.length && tableValues.length == numberOfDates && (
          <LineChart tableData={tableValues} trades={trades} />
        )}
      </div>
      {tableValues.length && tableValues.length == numberOfDates && (
        <DataTable tableData={tableValues} />
      )}
    </div>
  );
}

export default App;
