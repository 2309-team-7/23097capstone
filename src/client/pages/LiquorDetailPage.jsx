import React from "react";
import { useParams } from "react-router-dom";
import { LiquorDetails } from "../components/LiquorDetails";
import { LiquorReviews } from "../components/LiquorReviews";
import { LiquorComments } from "../components/LiquorComments";
import Page from "../components/Page";

export default function LiquorDetailPage({ token }) {
  let { itemId } = useParams();

  console.log({ itemId });

  return (
    <Page>
      <LiquorDetails token={token} itemId={itemId} />
      <LiquorReviews itemId={itemId} token={token} />
      <LiquorComments />
    </Page>
  );
}
