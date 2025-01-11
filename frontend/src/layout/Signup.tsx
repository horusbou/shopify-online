import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../utils/api";
import { SignUpUser } from "../types";
import { redirect } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

const Signup = () => {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const user: SignUpUser = values;
      try {
        await signUp(user); // Call your signup function
        redirect("/login"); // Redirect on success
      } catch (error: any) {
        setSubmitting(false); // Stop the submitting state
        if (error.response && error.response.data) {
          console.log("error:", error);
          const serverErrors = error.response.data.message;
          setError(serverErrors);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  return (
    <SignupWrapper>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>

        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="error">{formik.errors.username}</div>
          )}
        </div>
        <div className="form-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>
        <div className="form-field">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
          Sign Up
        </button>
      </form>
    </SignupWrapper>
  );
};

const SignupWrapper = styled.div`
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

    .form-field {
      display: flex;
      flex-direction: column;
      position: relative;

      input {
        padding: 1rem;
        font-size: 1.4rem;
        border: 1px solid hsl(var(--grayish-blue));
        border-radius: 0.6rem;
      }

      .error {
        font-size: 1.2rem;
        color: hsl(var(--orange));
        margin-top: 0.4rem;
      }
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
        background-color: hsl(var(--pale-orange));
        cursor: not-allowed;
      }
    }
  }

  .error-message {
    position: absolute;
    top: 0;
    right: -200px;
    width: 200px;
    padding: 1rem;
    background-color: red;
    color: white;
    border-radius: 0.6rem;
  }
`;

export default Signup;
