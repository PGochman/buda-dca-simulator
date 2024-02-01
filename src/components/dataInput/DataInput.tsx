import { useState } from "react";
import { getTodayInfo } from "../../utils/functions";
import style from "./dataInput.module.css";
import { DateInputType } from "../../utils/types";

export default function DateInput({
  handleInfoChange,
  price,
  initialDate,
  finalDate,
}: DateInputType) {
  const minDate = "2009-01-31";
  const { year, month, day } = getTodayInfo();
  const now = `${year}-${month}-${day}`;

  const [inputInitialDate, setInputInitialDate] = useState(initialDate);
  const [inputFinalDate, setInputFinalDate] = useState(finalDate);
  const [inputPrice, setInputPrice] = useState<number>(price);

  return (
    <div className={style.div}>
      <input
        type="date"
        name="initialDate"
        min={minDate}
        max={finalDate.length ? finalDate : now}
        value={inputInitialDate}
        onChange={(e) => {
          setInputInitialDate(e.target.value);
        }}
        className={style.input}
      />
      <input
        type="date"
        name="finalDate"
        min={initialDate.length ? initialDate : minDate}
        max={now}
        value={inputFinalDate}
        onChange={(e) => {
          setInputFinalDate(e.target.value);
        }}
        className={style.input}
      />
      <input
        type="number"
        name="amount"
        onChange={(e) => setInputPrice(Number(e.target.value))}
        value={inputPrice}
        className={style.input}
      />
      <button
        disabled={
          inputInitialDate == initialDate &&
          inputFinalDate == finalDate &&
          inputPrice == price
        }
        className={style.input}
        onClick={() =>
          handleInfoChange({
            initialDate: inputInitialDate,
            finalDate: inputFinalDate,
            amount: inputPrice,
          })
        }
      >
        Calculate
      </button>
    </div>
  );
}
