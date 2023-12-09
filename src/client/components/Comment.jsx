import { useState, useEffect} from "react";
import Axios from "axios"
import styles from "./Comment.module.css";
const [ review, setReview ] = useState();

function Comments({ comment, token }) {
  const [ comments, setComments ] = useState([]);

  useEffect(() => {
    reviewComments();
  }, []);

  async function reviewComments() {
    const API = "http://localhost:3000/2309-7-db/api"
  
  try {
    const { data: response } = await Axios.get(`${API}/reviews/comments/${review.id}`);
    setComments(response.data.comments);
  } catch(err) {
    console.error(err)
  }
  return (
    <ol className="comments-container">
      {comments.length ? (
        comments.map((comment) => {
          return (
            <li key={comment.id}>
              <h3>{comment.user_id}</h3>
              <h4>{comment.content}</h4>
            </li>
          )
        })
      ) : (
        <h2>No comments.</h2>
      )}
        </ol>
  )    
  }
}

export default Comments;