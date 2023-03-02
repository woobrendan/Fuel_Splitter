const TripCheckList: React.FC = () => {
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
