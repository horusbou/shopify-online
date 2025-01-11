import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;

  h2 {
    color: red;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: hsl(var(--orange));
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: hsl(var(--dark-orange));
    }
  }
`;

interface ErrorModalProps {
  message: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ErrorModal;
