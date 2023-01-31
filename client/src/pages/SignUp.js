import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3024/users/registration", data).then((response) => {
    //   navigate("/");
        console.log(data);
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Sid"
            autocomplete="off"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            name="password"
            placeholder="Your password..."
            autocomplete="off"
            type="password"
          />
          <button type="submit">SignUp</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
