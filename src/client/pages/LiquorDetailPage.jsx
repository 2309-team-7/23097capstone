import React from "react";
import { useParams } from "react-router-dom";
import { LiquorDetails } from "../components/LiquorDetails";
import Page from "../components/Page";
import { useApiHook } from "../hooks/useApi";

export default function LiquorDetailPage({ token }) {
  let { itemId } = useParams();

  console.log({ itemId });

  return (
    <Page>
      <LiquorDetails token={token} itemId={itemId} />
      <LiquorReviews itemId={itemId} token={token} />
    </Page>
  );
}

function LiquorReviews({ itemId, token }) {
  const { data: items, isLoading, error } = useApiHook(`/items/reviews/${itemId}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        <h3>Reviews</h3>
        {items.length === 0 ? (
          <li>No reviews yet</li>
        ) : (
          items.map((item) => {
            return (
              <li>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <LiquorComments itemId={itemId} token={token} reviewId={item.id} />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

function LiquorComments({ reviewId, token }) {
  const { data: items, isLoading, error } = useApiHook(`/reviews/comments/${reviewId}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        <h3>Comments</h3>
        {items.length === 0 ? (
          <li>No comments yet</li>
        ) : (
          items?.map((item) => {
            return (
              <li>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
