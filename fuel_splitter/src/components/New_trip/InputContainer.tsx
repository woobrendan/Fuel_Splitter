interface Props {
  onInputChange: (e: React.FormEvent) => void;
  val: number | string;
  error: boolean;
  label: string;
  name: string;
}

const InputContainer: React.FC<Props> = ({
  onInputChange,
  val,
  error,
  label,
  name,
}) => {
  return (
    <div className="newTrip__input__container">
      <label>{label}:</label>
      <input
        type="input"
        value={val}
        data-testid={name}
        name={name}
        onChange={(e: React.FormEvent) => onInputChange(e)}
      />
      {error && <span className="error">Must have {label}</span>}
    </div>
  );
};

export default InputContainer;
