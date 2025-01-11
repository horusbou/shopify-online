import styled from "styled-components";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <ErrorWrapper>
      <div className="error-container">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: hsl(var(--pale-orange));
  color: hsl(var(--dark-orange));
  border: 1px solid hsl(var(--orange));
  border-radius: 0.8rem;
  padding: 1.2rem 1.6rem;
  box-shadow: 0 0.4rem 0.6rem hsl(var(--black) / 0.2);
  z-index: 1000;

  .error-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin: 0;
      font-size: 1.4rem;
    }

    .close-btn {
      background: none;
      border: none;
      color: hsl(var(--dark-orange));
      font-size: 1.6rem;
      cursor: pointer;
      margin-left: 1rem;

      &:hover {
        color: hsl(var(--orange));
      }
    }
  }
`;

export default ErrorMessage;
