import React from "react";
import LiquorDetails from "../components/LiquorDetails";
import Page from "../components/Page";

export default function LiquorDetailPage({ token, user }) {
  return (
    <Page>
      <LiquorDetails token={token} user={user} />
    </Page>
  );
}
