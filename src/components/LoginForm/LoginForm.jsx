import { useId } from "react";

const LoginForm = ({ onLogin }) => {
  const loginId = useId();
  const passwordId = useId();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const { login, password } = form.elements;

    // Викликаємо пропс onLogin
    onLogin({
      login: login.value,
      password: password.value,
    });

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={loginId}>Login</label>
        <input type="text" name="login" id={loginId} />
        <label htmlFor={passwordId}>Password</label>
        <input type="password" name="password" id={passwordId} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
