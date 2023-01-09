import { Button } from "@mui/material";
import { useState } from "react";

const GasPay: React.FC = () => {
  const [gasCost, setGasCost] = useState<number>(0);

  return (
    <form className="single_trip__submitAll">
      <div className="single_trip__submitAll__input">
        <label>Total Gas Paid:</label>
        <input
          placeholder="Enter Total KM's travelled"
          type="input"
          value={gasCost}
          onChange={(e) => setGasCost(Number(e.target.value))}
        />
      </div>
      <Button variant="contained" color="success" type="submit">
        Submit All
      </Button>
    </form>
  );
};

export default GasPay;
