const InputContainer: React.FC = () => {
  return (
    <div className="newTrip__input__container">
      <label>Total KM's:</label>
      <input
        placeholder="Enter Total KM's travelled"
        type="input"
        value={tripInfo.totalKM}
        data-testid="trip_km"
        name="totalKM"
        onChange={(e: React.FormEvent) => onInputChange(e)}
      />
      {error.hasDistance && <span className="error">Must have KMs</span>}
    </div>
  );
};

export default InputContainer;
