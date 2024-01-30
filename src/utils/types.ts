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