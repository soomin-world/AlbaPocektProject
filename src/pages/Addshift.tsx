import { useState } from "react";

function AddShift() {
  const [hourlyWage, setHourlyWage] = useState("");
  return (
    <div className="container">
      <h1>언제 얼마나 일하시나요?</h1>
      <div className="hourlyWage">
        <label>시급</label>
        <input
          placeholder="₩9,620"
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </div>
  );
}

export default AddShift;
