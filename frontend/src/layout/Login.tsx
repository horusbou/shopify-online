import { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLoading, error } = useLogin();

  // Local state for form inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // Error state for form validation
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async(event: React.FormEvent) => {
    event.preventDefault();

    // Validate form inputs
    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }

    setFormError(null);
    const isSuccess = await login(email, password);
    if (isSuccess) {
      navigate("/profile");
    }
  };

  return (
    <LoginWrapper>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formError && <ErrorMessage>{formError}</ErrorMessage>} {/* Display form errors */}
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display API errors */}
        <button
          className="submit-btn"
          onClick={handleLogin}
          disabled={isLoading}  // Disable button when loading
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    input {
      padding: 1rem;
      font-size: 1.4rem;
      border: 1px solid hsl(var(--grayish-blue));
      border-radius: 0.6rem;
    }

    .submit-btn {
      background-color: hsl(var(--orange));
      color: hsl(var(--white));
      padding: 1rem;
      border: none;
      border-radius: 0.6rem;
      cursor: pointer;

      &:hover {
        background-color: var(--dark-orange);
      }

      &:disabled {
        background-color: hsl(var(--grayish-blue));
        cursor: not-allowed;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export default Login;
