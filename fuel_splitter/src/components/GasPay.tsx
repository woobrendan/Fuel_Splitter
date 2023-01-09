import { Button } from "@mui/material";
import { useState } from "react";

interface GasBill {
  gasCost: string | number;
  costPerL: string | number;
}

const GasPay: React.FC = () => {
  const [gasBill, setGasBill] = useState<GasBill>({
    gasCost: "",
    costPerL: "",
  });

  return (
    <form className="single_trip__submitAll">
      <div className="single_trip__submitAll__input">
        <label>Cost per Litre:</label>
        <input
          type="number"
          placeholder="Enter Cost Per Litre"
          value={gasBill.costPerL}
          onChange={(e: React.FormEvent) => {
            const target = e.target as HTMLTextAreaElement;
            setGasBill((prev) => ({
              ...prev,
              costPerL: Number(target.value),
            }));
          }}
        />
      </div>
      <div className="single_trip__submitAll__input">
        <label>Total Gas Paid:</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter Gas Paid"
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
