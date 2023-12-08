import React from "react";
import LiquorList from "../components/LiquorList";
import PageHeader from "../components/PageHeader";
import Page from "../components/Page";

export default function HomePage() {
  return (
    <Page>
      <PageHeader title="Home" />
      <LiquorList />
    </Page>
  );
}
