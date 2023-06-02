import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
const Post = () => {
  const id = useParams();
  const [postValue, setPostValue] = useState([]);
  const [commentList, setcommentList] = useState([]);
  const [newComment, setnewComment] = useState("");
  const {AuthState}=useContext(AuthContext);

  // const [username, setUsername] = useState("");
  useEffect(() => {
    axios.post("http://localhost:3024/post", id).then((response) => {
      setPostValue(response.data);
    });
    axios.post("http://localhost:3024/comments", id).then((response) => {
      setcommentList(response.data);
      // console.log("Comment Added !")
    
    });
  }, []);
  const addComment = () => {
    axios
      .post("http://localhost:3024/comments/new", {
        commentBody: newComment,
        Pid: id,
        Username: "",
      },
      {
        headers:{
          accessToken:localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if(response.data.error)
        {
          alert(response.data.error);
        }
        else
        {
          // setUsername(response.data.Username)
          setcommentList(response.data);

        }
        // console.log("Comment Added");
      });
    setnewComment("");
    // setUsername("");
    console.log(newComment);
    // console.log(username);
  };

  const deleteComment=(comment_id)=>{
    
    axios.delete(`http://localhost:3024/comments/${id.id}/${comment_id}`,{
      headers:{
        accessToken:localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if(response.data.error)
      {
        alert(response.data.error);
      }
      else
      {
        // setUsername(response.data.Username)
        setcommentList(response.data.comments);
        alert(response.data.message);


      }
      // console.log("Comment Added");
    });
  setnewComment("");
  }

  if (!postValue.length) return <div>Loading...</div>;

  return (
    <>
      {postValue.map((post) => (
        <div className="postPage">
          <div className="leftSide">
            <div className="post" >
              <div className="title">{post.title}</div>
              <div className="body">{post.postText}</div>
              <div className="footer">{post.username}</div>
            </div>
          </div>
          <div className="rightSide">
            <div className="addCommentContainer">
              <input
                type="text"
                value={newComment}
                placeholder="Comment..."
                autoComplete="off"
                onChange={(event) => {
                  setnewComment(event.target.value);
                }}
              />
              {/* <input
                type="text"
                placeholder="Name"
                value={username}
                autoComplete="off"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              /> */}
              <button onClick={addComment}>Add</button>
            </div>
            <div className="listOfComments">
              {commentList.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    className="
                comment"
                  >
                    {comment.commentBody}
                    <p>-{comment.Username}</p>
                    {AuthState.username===comment.Username&&<button onClick={()=>{deleteComment(comment.Cid)}}>X</button>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;
