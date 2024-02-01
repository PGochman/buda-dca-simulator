import { render , screen} from "@testing-library/react"
import DataTable from "../components/dataTable/DataTable"
import { dataGrowth, dataLoss } from "./data"
import { TableData } from "../utils/types"
import InvestmentProfit from "../components/investmentProfit/InvestmentProfit"

describe("Data Table", () => {
    beforeEach(() => {
        render(
            <DataTable 
                tableData={dataGrowth}
            />
        )
    })
    test("show component correctly", () =>{
        const tableHeaders = ["#", "Date (Y/M/D)", "BTC price", "Total invested", "Portfolio value", "Variation(CLP)", "Variation(%)"]
        tableHeaders.forEach((value) => {
            expect(screen.getByText(value)).toBeDefined()
        })
    })

    test("show table values correctly", () =>{
        dataGrowth.forEach((value) => {
            for (let prop in value){
                const regexp = new RegExp(`\\b${value[prop as keyof TableData]}\\b`)
                expect(screen.getAllByText(regexp)).toBeDefined()
            }
        })
    })
})

describe("Investment profit", () => {
    beforeEach(() => {
        render(
            <InvestmentProfit 
                investedAmount={dataLoss.at(-1)?.investedAmount}
                percentage={dataLoss.at(-1)?.percentageChange}
                portfolioValue={dataLoss.at(-1)?.portfolioValue}
                profit={dataLoss.at(-1)?.valueChange}
            />
        )
    })
    test("show component correctly", () =>{
        const titles = ["Invested Amount", "Portfolio value", "Loss", "Loss"]
        titles.forEach((value) => {
            const regexp = new RegExp(`\\b${value}\\b`)
            expect(screen.getAllByText(regexp)).toBeDefined()
        })
    })

    // test("show table values correctly", () =>{
    //     const values = [dataLoss.at(-1)?.investedAmount, dataLoss.at(-1)?.percentageChange, dataLoss.at(-1)?.portfolioValue, dataLoss.at(-1)?.valueChange]
    //     console.log(values)
    //     values.forEach((value) => {
    //         const regexp = new RegExp(`\\b${value}\\b`)
    //         expect(screen.getAllByText(regexp)).toBeDefined()
    //     })
    // })
})