import { FormGroup } from "@mui/material";
import TripCheckbox from "./TripCheckbox";
import { TripInfo, getCheckValues, NameVal } from "../../../Models/tripModels";
import React from "react";

interface Props {
  tripInfo: TripInfo;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  comp: string;
}

const TripCheckList: React.FC<Props> = ({ tripInfo, onCheck, error, comp }) => {
  return (
    <>
      <h2>Trip Participants</h2>
      <FormGroup className={`${comp}__checkboxes`}>
        {getCheckValues(tripInfo).map((nameVal: NameVal, index: number) => (
          <TripCheckbox
            key={index}
            nameVal={nameVal}
            onCheck={(e) => onCheck(e)}
          />
        ))}
      </FormGroup>
      {error && <span className="error">At least one box must be checked</span>}
    </>
  );
};

export default TripCheckList;
