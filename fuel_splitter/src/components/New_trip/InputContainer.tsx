interface Props {
  onInputChange: (e: React.FormEvent) => void;
  val: number;
  error: boolean;
  label: string;
}

const InputContainer: React.FC<Props> = ({
  onInputChange,
  val,
  error,
  label,
}) => {
  return (
    <div className="newTrip__input__container">
      <label>{label}:</label>
      <input
        placeholder="Enter Total KM's travelled"
        type="input"
        value={val}
        data-testid="trip_km"
        name="totalKM"
        onChange={(e: React.FormEvent) => onInputChange(e)}
      />
      {error && <span className="error">Must have KMs</span>}
    </div>
  );
};

export default InputContainer;
