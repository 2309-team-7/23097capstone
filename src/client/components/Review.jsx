import React, { Fragment, useState } from "react";
import { LiquorComments } from "./LiquorComments";
import { RemoveReviewButton } from "./RemoveReviewButton";
import { UpdateReviewForm } from "./UpdateReviewForm";

export function Review({ review, token, removeReviewById }) {
  const [mode, setMode] = useState("view");
  return (
    <li>
      {mode === "view" ? (
        <Fragment>
          <h4>{review.content}</h4>
          <UserDetails />
          <button onClick={() => setMode("edit")}>Edit</button>
        </Fragment>
      ) : (
        <UpdateReviewForm
          reviewId={review.id}
          token={token}
          setMode={setMode}
          reviewRating={review.rating}
          reviewContent={review.content}
        />
      )}
      <RemoveReviewButton token={token} reviewId={review.id} removeReviewById={removeReviewById} />
      <ul>
        <li>
          <LiquorComments token={token} reviewId={review.id} />
        </li>
      </ul>
    </li>
  );
}

function UserDetails() {
  return <p>User Details</p>;
}
