import { TableData } from "../utils/types";

export const dataGrowth : TableData[] = [
    {
        orderNumber: 1,
        date: "2023/01/01",
        BTCPrice: 10000,
        investedAmount: 100,
        portfolioValue: 100,
        percentageChange: 0,
        valueChange: 0
    },
    {
        orderNumber: 2,
        date: "2023/02/01",
        BTCPrice: 10500,
        investedAmount: 200,
        portfolioValue: 205,
        percentageChange: 2.5,
        valueChange: 5
    },
    {
        orderNumber: 3,
        date: "2023/03/01",
        BTCPrice: 11000,
        investedAmount: 300,
        portfolioValue: 314.76,
        percentageChange: 4.92,
        valueChange: 14.76
    }

]

export const dataLoss : TableData[] = [
    {
        orderNumber: 1,
        date: "2023/01/01",
        BTCPrice: 10000,
        investedAmount: 100,
        portfolioValue: 100,
        percentageChange: 0,
        valueChange: 0
    },
    {
        orderNumber: 2,
        date: "2023/02/01",
        BTCPrice: 9500,
        investedAmount: 200,
        portfolioValue: 195,
        percentageChange: -2.5,
        valueChange: -5
    },
    {
        orderNumber: 3,
        date: "2023/03/01",
        BTCPrice: 9000,
        investedAmount: 300,
        portfolioValue: 284.73,
        percentageChange: -5.08,
        valueChange: -15.26
    }

]