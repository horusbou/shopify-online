import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";

const FloatingLogin = ({ className }: { className: string }) => {
  const { state: { user }, logout } = useGlobalContext();
  const navigate = useNavigate();

  function handleGoToSettings(): void {
    navigate("/profile");
  }
  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  function handleLogout(): void {
    logout()
    removeCookie("accessToken")
    removeCookie("refreshToken")
    navigate("/")

  }

  return (
    <FloatingLoginWrapper className={className}>
      {user ? (
        <div className="user-info">
          <img src={user.avatar} alt={`${user.name}'s avatar`} className="avatar" />
          <span className="user-name">{user.name}</span>
          <button className="settings-btn" onClick={handleGoToSettings}>Profile</button>
          <button className="log-out-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      )}
    </FloatingLoginWrapper>
  );
};

const FloatingLoginWrapper = styled.div`
  display: none;
  position: absolute;
  border-radius: 1rem;
  background-color: hsl(var(--white));
  top: 6rem;
  right: -1.6rem;
  margin: 0 auto;
  z-index: 1000;
  width: 36rem;
  box-shadow: 0 2rem 5rem -2rem hsl(var(--black) / 0.9);
  &.active {
    display: block;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2.4rem;
    width: 100%; /* Ensure the user info container takes up full width */
    justify-content: space-between; /* Align items properly in a row */

    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }

    .user-name {
      font-size: 1.6rem;
      font-weight: 700;
    }

    .settings-btn,
    .log-out-btn {
      background-color: hsl(var(--orange));
      color: hsl(var(--white));
      padding: 0.8rem 1.6rem;
      border: none;
      border-radius: 0.6rem;
      cursor: pointer;
      font-size: 1.4rem;

      &:hover {
        background-color: var(--dark-orange);
      }
    }

    .log-out-btn {
      margin-left: 1rem; /* Add spacing between the buttons */
    }
  }

  .auth-buttons {
    display: flex;
    justify-content: space-around;
    padding: 2.4rem;

    a {
      text-decoration: none;
      background-color: hsl(var(--orange));
      color: hsl(var(--white));
      padding: 1rem 2rem;
      border-radius: 0.6rem;
      font-weight: bold;
      text-align: center;

      &:hover {
        background-color: var(--dark-orange);
      }
    }
  }
`;

export default FloatingLogin;
