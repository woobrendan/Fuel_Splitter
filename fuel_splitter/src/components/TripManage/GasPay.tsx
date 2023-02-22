import { Button } from "@mui/material";
import { useState } from "react";
import { GasBill } from "../../model";
import { useAppSelector } from "../../store/hooks";
import InputContainer from "./InputContainer";

interface Prop {
  finalSubmit: (gasBill: GasBill) => void;
}

interface BillError {
  gasCostError: boolean;
  costPerLError: boolean;
  hasTrips: boolean;
}

const initialErrorState = {
  gasCostError: false,
  costPerLError: false,
  hasTrips: false,
};

const GasPay: React.FC<Prop> = ({ finalSubmit }) => {
  const oneBill = useAppSelector((state) => state.fuelBill);
  const [gasBill, setGasBill] = useState<GasBill>({
    gasCost: 0,
    costPerL: 0,
  });

  const [error, setError] = useState<BillError>(initialErrorState);
  const { gasCost, costPerL } = gasBill;
  const { gasCostError, costPerLError, hasTrips } = error;

  const handleFinalSubmit = (e: React.FormEvent, gasBill: GasBill) => {
    e.preventDefault();
    const errorCopy: BillError = { ...error };

    !gasCost
      ? (errorCopy.gasCostError = true)
      : (errorCopy.gasCostError = false);

    !costPerL
      ? (errorCopy.costPerLError = true)
      : (errorCopy.costPerLError = false);

    oneBill.tripLogs.length < 1
      ? (errorCopy.hasTrips = true)
      : (errorCopy.hasTrips = false);

    if (
      errorCopy.gasCostError ||
      errorCopy.costPerLError ||
      errorCopy.hasTrips
    ) {
      setError(() => ({ ...errorCopy }));
      return;
    } else {
      setError(() => initialErrorState);
      finalSubmit(gasBill);
    }
  };

  const onInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setGasBill((prev) => ({
      ...prev,
      [target.name]: Number(target.value),
    }));
  };

  return (
    <div className="single_trip__submitAll">
      {hasTrips && <span data-cy="no_trips">Must have at least one Trip</span>}
      <form className="single_trip__submitAll__form">
        <InputContainer
          val={gasBill.costPerL}
          error={costPerLError}
          onInputChange={onInputChange}
          label="Cost Per L"
          name="costPerL"
          type="number"
          comp="gasPay"
        />
        <InputContainer
          val={gasBill.gasCost}
          error={gasCostError}
          onInputChange={onInputChange}
          label="Total Gas Paid"
          name="gasCost"
          type="number"
          comp="gasPay"
        />
        <Button
          variant="contained"
          onClick={(e) => handleFinalSubmit(e, gasBill)}
          className="submit_button"
          data-testid="submit_all"
        >
          Submit All
        </Button>
      </form>
    </div>
  );
};

export default GasPay;
