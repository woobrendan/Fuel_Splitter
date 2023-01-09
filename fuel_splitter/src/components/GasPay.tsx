import { Button } from "@mui/material";
import { useState } from "react";
import { GasBill } from "../model";

interface Prop {
  finalSubmit: (e: React.FormEvent, gasBill: GasBill) => void;
}

const GasPay: React.FC<Prop> = ({ finalSubmit }) => {
  const [gasBill, setGasBill] = useState<GasBill>({
    gasCost: 0,
    costPerL: 0,
  });

  return (
    <form
      className="single_trip__submitAll"
      onSubmit={(e) => finalSubmit(e, gasBill)}
    >
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
