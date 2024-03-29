import style from "./investmentprofit.module.css"
import { InvestmentProfitProps } from "../../utils/types";

export default function InvestmentProfit ({investedAmount, portfolioValue, percentage, profit} : InvestmentProfitProps) {
    return (
        <div>
            <div className={style.div}>
                <span><h5>CLP${investedAmount}</h5><p>Invested Amount</p></span>
                <h5>&gt;&gt;</h5>
                <span><h5>CLP${portfolioValue}</h5><p>Portfolio value</p></span>
            </div>
            {(percentage && profit) &&
            <>
                <p className={percentage > 0 ? style.greater : style.lesser}>{percentage > 0 ? "Growth +" + percentage : "Loss " + percentage}%</p>
                <p className={profit > 0 ? style.greater : style.lesser}>{profit > 0 ? "Gain +" + profit : "Loss " + profit}$CLP</p>
            </>
            }
        </div>
    )
}