import React from "react";
import LiquorDetails from "../components/LiquorDetails";
import Page from "../components/Page";

export default function LiquorDetailPage({ token }) {
  console.log({ token });

  return (
    <Page>
      <LiquorDetails token={token} />
    </Page>
  );
}
