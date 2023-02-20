interface Props {
  onInputChange: (e: React.FormEvent) => void;
  val: number | string;
  error: boolean;
  label: string;
  name: string;
  type: string;
  comp: string;
}

const InputContainer: React.FC<Props> = ({
  onInputChange,
  val,
  error,
  label,
  name,
  type,
  comp,
}) => {
  return (
    <div className={`input__container_${comp}`}>
      <label>{label}:</label>
      <input
        type={type}
        value={val}
        data-testid={name}
        name={name}
        onChange={(e: React.FormEvent) => onInputChange(e)}
      />
      {error && (
        <span className="error" data-cy={`${name}_error`}>
          Must have {label}
        </span>
      )}
    </div>
  );
};

export default InputContainer;
