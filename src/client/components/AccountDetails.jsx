import React, { useEffect, useState } from "react";

import styles from "./AccountDetails.module.css";

import MyComments from "./MyComments";
import MyReviews from "./MyReviews";



async function fetchMyAccount({ token }) {
  const response = await fetch(`http://localhost:3000/users/:id`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
}

export default function AccountDetails({ token }) {
  const [accountDetails, setAccountDetails] = useState();
  const removeReviewById = (reviewId) => {
    setAccountDetails((accountDetails) => {
      return {
        ...accountDetails,
        reviews: accountDetails.reviews.filter(
          (review) => review.id !== reviewId
        ),
      };
    });
  };
  const removeCommentById = (commentId) => {
    setAccountDetails((accountDetails) => {
      return {
        ...accountDetails,
        comments: accountDetails.comments.filter(
          (comment) => comment.id !== commentId
        ),
      };
    });
  };

  useEffect(() => {
    async function getAccountDetails() {
      try {
        const account = await fetchMyAccount({ token });
        setAccountDetails(account);
      } catch (error) {
        console.error(error);
      }
    }
    getAccountDetails();
  }, []);

  if (!accountDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.div}>
      <h1>{`${accountDetails.firstname} ${accountDetails.lastname}`}</h1>
      <h3>{`Email: ${accountDetails.email}`}</h3>
      <MyReviews
        reviews={accountDetails.reviews}
        token={token}
        removeReviewById={removeReviewById}
      />{" "}
      <MyComments
        comments={accountDetails.comments}
        token={token}
        removeCommentById={removeCommentById}
      />
    </div>
  );
}
