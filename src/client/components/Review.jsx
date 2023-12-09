import { useState, useEffect } from "react";
import Axios from "axios";
const [ item, setItem ] = useState()

function itemReviews({ review, token }) {
 const [ reviews, setReviews ] = useState([]);


useEffect(() => {
  fetchItemReviews()
}, []);

async function fetchItemReviews() {
  const API = "http://localhost:3000/2309-7-db/api";

  try {
    const { data: response } = await Axios.get(`${API}/items/reviews/${item.id}`);
    setReviews(response.data.reviews);
  } catch (err) {
    console.error(err)
  }
}

return (
  <ol className="reviews-container">
    {reviews.length ? (
      reviews.map((review) => {
        return (
          <li key={review.id}>
            <h2>{review.user_id}</h2>
            <h3>{review.content}</h3>
            <div>
              <h2>{review.rating}</h2>
            </div>
          </li>
        );
      })
    ) : (
      <h2>Item has yet to be reviewed.</h2>
    )}
  </ol>
  )
}

export default itemReviews;