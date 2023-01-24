import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik"

const CreatePost = () => {
  return (
    <div className='createPostPage'>
        <Formik>
            <Form className='formContainer'>
                <label>Title: </label>
                <Field id='inputCreatePost' name='title' placeholder='My Post'/>
                <label>Post: </label>
                <Field id='inputCreatePost' name='postText' placeholder='Whats on your mind ?'/>
                <label>Name: </label>
                <Field id='inputCreatePost' name='username' placeholder='Sid'/>
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost