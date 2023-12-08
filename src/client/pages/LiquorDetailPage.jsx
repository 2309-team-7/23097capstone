import React from "react";
import { useParams } from "react-router-dom";
import { LiquorDetails } from "../components/LiquorDetails";
import Page from "../components/Page";

export default function LiquorDetailPage({ token }) {
  let { itemId } = useParams();

  console.log({ itemId })

  return (
    <Page>
      <LiquorDetails token={token} itemId={itemId} />
    </Page>
  );
}
