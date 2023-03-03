import { FormGroup } from "@mui/material";
import TripCheckbox from "./TripCheckbox";
import { TripInfo, getCheckValues, NameVal } from "../../../Models/tripModels";
import React from "react";

interface Props {
  tripInfo: TripInfo;
  onCheck: (e: React.FormEvent) => void;
  error: boolean;
}

const TripCheckList: React.FC<Props> = ({ tripInfo, onCheck, error }) => {
  return (
    <>
      <h2>Trip Participants</h2>
      <FormGroup className="newTrip__checkboxes">
        {getCheckValues(tripInfo).map((name: NameVal, index: number) => (
          <TripCheckbox key={index} nameVal={name} onCheck={onCheck} />
        ))}
      </FormGroup>
      {error.hasCheck && (
        <span className="error">At least one box must be checked</span>
      )}
    </>
  );
};

export default TripCheckList;
