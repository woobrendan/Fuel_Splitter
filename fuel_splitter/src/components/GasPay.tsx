import { Button } from "@mui/material";
import { useState } from "react";

interface GasBill {
  gasCost: number;
  costPerL: number;
}

const GasPay: React.FC = () => {
  const [gasBill, setGasBill] = useState<GasBill>({
    gasCost: 0,
    costPerL: 0,
  });

  return (
    <form className="single_trip__submitAll">
      <div className="single_trip__submitAll__input">
        <label>Cost per Litre:</label>
        <input
          type="input"
          value={gasBill.costPerL}
          // onChange={(e) => setGasCost(Number(e.target.value))}
        />
      </div>
      <div className="single_trip__submitAll__input">
        <label>Total Gas Paid:</label>
        <input
          type="input"
          value={gasBill.gasCost}
          onChange={(e: React.FormEvent) => {
            const target = e.target as HTMLTextAreaElement;
            setGasBill((prev) => ({
              ...prev,
              gasCost: Number(target.value),
            }));
          }}
        />
      </div>
      <Button variant="contained" color="success" type="submit">
        Submit All
      </Button>
    </form>
  );
};

export default GasPay;
