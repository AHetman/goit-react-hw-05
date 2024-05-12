import css from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <>
      <p className={css.errorMes}>Whops... something went wrong</p>
    </>
  );
};
export default ErrorMessage;
