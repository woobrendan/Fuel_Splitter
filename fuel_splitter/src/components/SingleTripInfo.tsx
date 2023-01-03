import NewTrip from "./NewTrip";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    //dispatch gas trip action
    console.log("Added");
  };

  return (
    <>
      <NewTrip handleAdd={handleAdd} />
    </>
  );
};

export default SingleTripInfo;
