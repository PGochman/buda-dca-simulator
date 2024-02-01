export type TradeResponse = {
    trades: Trades;
}

export type Trades = {
    market_id:      string;
    timestamp:      null;
    last_timestamp: string;
    entries:        Array<Array<number | string>>;
}

export type Entry = {
    timestamp: string | number,
    amount: string | number,
    price: string | number,
}

export type TableData = {
    orderNumber: number,
    date: string,
    BTCPrice: number | string,
    investedAmount: number,
    portfolioValue: number,
    valueChange: number,
    percentageChange: number
}

export type Info = {
    initialDate: string,
    finalDate: string,
    amount: number
}

export type DataTableProps = {
    tableData : TableData[]
}

export type InvestmentProfitProps = {
    investedAmount: number | undefined,
    portfolioValue: number | undefined, 
    percentage: number | undefined, 
    profit: number | undefined
}

export type LineChartProps = {
    trades: Entry[],
    tableData: TableData[]
}

export type DateInputType = {
    initialDate: string,
    finalDate: string,
    price: number,
    handleInfoChange: (info: Info) => void
}