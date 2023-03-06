import TripCheckList from "./New_trip/TripCheckList";
import InputContainer from "./InputContainer";
import { TripInfo } from "../../Models/tripModels";
import { tripErrorHandle } from "../../Models/errorModels";

interface Props {
  trip: TripInfo;
  onInputChange: (e: React.FormEvent) => void;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: tripErrorHandle;
  comp: string;
}

const TripManager: React.FC<Props> = ({
  trip,
  onInputChange,
  onCheck,
  error,
  comp,
}) => {
  return (
    <>
      <TripCheckList
        error={error.hasCheck}
        tripInfo={trip}
        onCheck={onCheck}
        comp={comp}
      />
      <section className={`${comp}__input`}>
        <InputContainer
          val={trip.totalKM}
          error={error.hasDistance}
          onInputChange={onInputChange}
          label="Total KM"
          name="totalKM"
          type="input"
          comp={comp}
        />
        <InputContainer
          val={trip.description}
          error={error.hasDescription}
          onInputChange={onInputChange}
          label="Trip Description"
          name="description"
          type="input"
          comp={comp}
        />
      </section>
    </>
  );
};

export default TripManager;
