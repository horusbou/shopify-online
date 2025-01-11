import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGlobalContext } from "../context/context";
import { UserType } from "../types";
import {updateUser} from "../utils/api";

const Profile = () => {
  const history = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [_updatedUser,setUpdatedUser] = useState<Omit<UserType,"role"|"id"|"session">>()
  const {state:{user},login} = useGlobalContext()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      address: user?.address || "",
      city:user?.city||"",
      country:user?.country || ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      username: Yup.string().required("Username is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values)
        let user = await updateUser(values);
    
        setUpdatedUser(values);
        login(user)
        setIsEditing(false); 
    
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  });

  const handleGoToOrders = () => {
    history("/orders");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <ProfileWrapper>
      <h1>User Profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
          />
          {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
        </div>
        <div className="form-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={true}
          />
          {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={true}
          />
          {formik.touched.username && formik.errors.username && <div className="error">{formik.errors.username}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
          />
          {formik.touched.address && formik.errors.address && <div className="error">{formik.errors.address}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
          />
          {formik.touched.city && formik.errors.city && <div className="error">{formik.errors.city}</div>}
        </div>
        <div className="form-field">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
          />
          {formik.touched.country && formik.errors.country && <div className="error">{formik.errors.country}</div>}
        </div>
        
          <button type="button" className="edit-btn" onClick={handleEditClick}>
            Update Profile
          </button>
          <button type="submit" className="submit-btn">Save Changes</button>
        
      </form>

      <button className="view-orders-btn" onClick={handleGoToOrders}>
        View Order Status
      </button>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  max-width: 600px;
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
        border: 1px solid #ddd;
        border-radius: 0.6rem;
      }

      .error {
        font-size: 1.2rem;
        color: red;
        margin-top: 0.4rem;
      }
    }

    .submit-btn {
      background-color: #4caf50;
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 0.6rem;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }

    .edit-btn {
      background-color: #ff9800;
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 0.6rem;
      cursor: pointer;

      &:hover {
        background-color: #e68900;
      }
    }
  }

  .view-orders-btn {
    background-color: #007bff;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    margin-top: 1.5rem;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default Profile;
