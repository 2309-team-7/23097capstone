import React from "react";
import { useParams } from "react-router-dom";
import { LiquorDetails } from "../components/LiquorDetails";
import { LiquorReviews } from "../components/LiquorReviews";
import { LiquorComments } from "../components/LiquorComments";
import Page from "../components/Page";

export default function LiquorDetailPage() {
  let { id } = useParams();

  console.log({ id });

  return (
    <Page>
      <LiquorDetails />
    </Page>
  );
}
