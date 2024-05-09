const Options = ({ updateFeedback, totalFeedback, resetFunction, clicks }) => {
  return (
    <>
      <button onClick={() => updateFeedback("good")}>Good</button>
      <button onClick={() => updateFeedback("neutral")}>Neutral</button>
      <button onClick={() => updateFeedback("bad")}>Bad</button>
      {totalFeedback > 0 && (
        <button
          onClick={() => {
            resetFunction(clicks);
          }}
        >
          Reset
        </button>
      )}
    </>
  );
};

export default Options;
