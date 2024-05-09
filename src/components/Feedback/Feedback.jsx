const Feedback = ({ click, totalFeedback, positivePercent }) => {
  return (
    <>
      <p>Good: {click.good}</p>
      <p>Neutral: {click.neutral}</p>
      <p>Bad: {click.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {positivePercent}%</p>
    </>
  );
};

export default Feedback;
