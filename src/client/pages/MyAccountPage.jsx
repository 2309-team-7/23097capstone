import PageHeader from "../components/PageHeader";

import AccountDetails from "../components/AccountDetails";
import React from "react";
import Page from "../components/Page";

export default function MyAccountPage({ token }) {
  return (
    <Page>
      <PageHeader title="My Account" />
      <AccountDetails token={token} />
    </Page>
  );
}
