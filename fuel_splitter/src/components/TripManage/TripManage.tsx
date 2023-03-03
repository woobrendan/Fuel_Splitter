const TripManager: React.FC = () => {
  return (
    <>
      <TripCheckList
        error={error.hasCheck}
        tripInfo={tripInfo}
        onCheck={onCheck}
        comp="newTrip"
      />
      <section className="newTrip__input">
        <InputContainer
          val={tripInfo.totalKM}
          error={error.hasDistance}
          onInputChange={onInputChange}
          label="Total KM"
          name="totalKM"
          type="input"
          comp="newTrip"
        />
        <InputContainer
          val={tripInfo.description}
          error={error.hasDescription}
          onInputChange={onInputChange}
          label="Trip Description"
          name="description"
          type="input"
          comp="newTrip"
        />
      </section>
    </>
  );
};

export default TripManager;
