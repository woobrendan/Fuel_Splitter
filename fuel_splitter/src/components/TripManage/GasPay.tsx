import { Button } from "@mui/material";
import { useState } from "react";
import { GasBill } from "../../model";
import { useAppSelector } from "../../store/hooks";

interface Prop {
  finalSubmit: (e: React.FormEvent, gasBill: GasBill) => void;
}

interface BillError {
  gasCostError: boolean;
  costPerLError: boolean;
  hasTrips: boolean;
}

const GasPay: React.FC<Prop> = ({ finalSubmit }) => {
  const oneBill = useAppSelector((state) => state.fuelBill);
  const [gasBill, setGasBill] = useState<GasBill>({
    gasCost: 0,
    costPerL: 0,
  });

  const [error, setError] = useState<BillError>({
    gasCostError: false,
    costPerLError: false,
    hasTrips: false,
  });
  const { gasCost, costPerL } = gasBill;
  const { gasCostError, costPerLError, hasTrips } = error;

  const handleFinalSubmit = (e: React.FormEvent, gasBill: GasBill) => {
    e.preventDefault();

    if (!gasCost) {
      setError((prev) => ({ ...prev, gasCostError: true }));
      if (!costPerL) {
        setError((prev) => ({ ...prev, costPerLError: true }));
        return;
      } else {
        setError((prev) => ({ ...prev, costPerLError: false }));
        return;
      }
    } else {
      setError((prev) => ({ ...prev, gasCostError: false }));
    }

    if (!costPerL) {
      setError((prev) => ({ ...prev, costPerLError: true }));
    } else {
      setError((prev) => ({ ...prev, costPerLError: false }));

      if (oneBill.tripLogs.length < 1) {
        setError((prev) => ({ ...prev, hasTrips: true }));
      } else {
        setError({
          costPerLError: false,
          gasCostError: false,
          hasTrips: false,
        });
        finalSubmit(e, gasBill);
      }
    }
  };

  return (
    <div className="single_trip__submitAll">
      {hasTrips && <span>Must have at least one Trip</span>}
      <form
        className="single_trip__submitAll__form"
        onSubmit={(e) => handleFinalSubmit(e, gasBill)}
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
          {costPerLError && <span>Section must be complete</span>}
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
          {gasCostError && <span>Section must be complete</span>}
        </div>
        <Button variant="contained" type="submit" className="submit_button">
          Submit All
        </Button>
      </form>
    </div>
  );
};

export default GasPay;
