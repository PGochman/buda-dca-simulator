import axios from "axios";
import { TradeResponse, Entry, TableData } from "./types";

export const getMonth = () => {
  let month = String(new Date(Date.now()).getMonth() + 1);
  if (month.length === 1) {
    month = `0${month}`;
  }

  return month;
};

export const getDates = ({
  initialDate,
  finalDate,
}: {
  initialDate: string;
  finalDate: string;
}) => {
  const dates = [];
  //let dateToPut = new Date(initialDate);

  let [initYear, initMonth, initDay]: Array<number | string> =
    initialDate.split("-");
  initMonth = Number(initMonth) - 1;
  let dateToPut = new Date(
    Number(initYear),
    Number(initMonth),
    Number(initDay),
    12
  );

  let [finalYear, finalMonth, finalDay]: Array<number | string> =
    finalDate.split("-");
  finalMonth = Number(finalMonth) - 1;
  let lastDate = new Date(
    Number(finalYear),
    Number(finalMonth),
    Number(finalDay),
    12
  );

  while (dateToPut < lastDate) {
    dates.push(dateToPut.valueOf());
    dateToPut.setMonth(dateToPut.getMonth() + 1);
  }

  dates.push(lastDate.valueOf());

  return dates;
};

export const getTradeInfo = async (date: number) => {
  try {
    const { trades }: TradeResponse = (
      await axios(
        `https://www.buda.com/api/v2/markets/btc-clp/trades?timestamp=${date}&limit=1`
      )
    ).data;
    let [timestamp, amount, price] = trades.entries[0];
    return { timestamp, amount, price };
  } catch (error) {
    console.log(error);
  }
};

export const parseDate = (date: string | number) => {
  const datedDate = new Date(Number(date));
  const year = datedDate.getFullYear();
  let month: number | string = datedDate.getMonth() + 1;
  let day: number | string = datedDate.getDate();
  if (String(month).length == 1) month = "0" + String(month);
  if (String(day).length == 1) day = "0" + String(day);
  return `${year}/${month}/${day}`;
};

export const sortByDate = (a: Entry, b: Entry) => {
  return Number(a.timestamp) - Number(b.timestamp);
};

export const getTableData = (prices: Entry[], price: number) => {
  const allValues: TableData[] = [];
  const btcPrices: (number | string)[] = [];
  prices.map((price: Entry) => {
    btcPrices.push(price.price);
  });
  prices.sort(sortByDate).map((dataPrice: Entry, index: number) => {
    const orderNumber = index + 1;
    const date = parseDate(dataPrice.timestamp);
    console.log(date)
    const BTCPrice = dataPrice.price;
    const investedAmount = price * (index + 1);
    let portfolioValue: number;
    if (index == 0) {
      portfolioValue = investedAmount;
    } else {
      portfolioValue = Number(
        (
          ((allValues[index - 1].portfolioValue * Number(BTCPrice)) /
            Number(btcPrices[index - 1])) +
          Number(price)
        ).toFixed(2)
      );
    }
    const valueChange = Number((portfolioValue - investedAmount).toFixed(2));
    const percentageChange = Number((valueChange * 100 / investedAmount).toFixed(2));
    allValues.push({
      orderNumber,
      date,
      BTCPrice,
      investedAmount,
      portfolioValue,
      valueChange,
      percentageChange,
    });
  });
  return allValues;
};

export const getTodayInfo = () => {
  const today = new Date(Date.now());
  const year = today.getFullYear();
  let month = getMonth();
  const day = today.getDate();
  return {year, month, day}
};

export const getMonthsArray = (prices: Entry[]) => {
    const labelsArray : string[] = []
        prices.sort(sortByDate).forEach((priceData: Entry) => {
            const date = new Date(Number(priceData.timestamp))
            const month = String(date).split(" ")[1]
            const year = date.getFullYear()
            labelsArray.push(`${month} ${year}`)
        })
        return labelsArray
}

export const getValueByMonth=(tableData: TableData[])=>{
    const values : number[] = []
    tableData.forEach((data) => {
        values.push(data.portfolioValue)
    })
    return values
}

export const getInvestByMonth = (tableData: TableData[]) => {
    const values : number[] = []
    tableData.forEach((data) => {
        values.push(data.investedAmount)
    })
    return values
}