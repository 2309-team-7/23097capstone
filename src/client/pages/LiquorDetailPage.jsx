import React from "react";
import { useParams } from "react-router-dom";
import { LiquorDetails } from "../components/LiquorDetails";
import Page from "../components/Page";
import { LiquorReviews } from "../components/LiquorReviews";

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
