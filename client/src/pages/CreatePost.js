import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik"
import { useNavigate } from "react-router-dom";

import * as Yup from 'yup';
import axios from 'axios';
 
const CreatePost = () => {
  const navigate = useNavigate();
  const initialValues={
    title:"",
    postText:"",
    username:""
  };

  const validationSchema=Yup.object().shape({

    title: Yup.string().required(),
    postText :Yup.string().required(),
    username:Yup.string().min(3).max(15).required()
  })
  const onSubmit=(data)=>{
    axios.post("http://localhost:3024/",data).then((response)=>{
        // console.log(response);
        // setListofposts(response.data);
        navigate("/");
      })
  }
  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field id='inputCreatePost' 
                name='title' placeholder='My Post' autocomplete="off"/>
                <label>Post: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field id='inputCreatePost' name='postText' placeholder='Whats on your mind ?' autocomplete="off"/>
                <label>Name: </label>
                <ErrorMessage name="username" component="span"/>
                <Field id='inputCreatePost' name='username' placeholder='Sid' autocomplete="off"/>
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost