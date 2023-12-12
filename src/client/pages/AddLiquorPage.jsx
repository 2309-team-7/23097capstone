import React from "react";
import AddLiquorForm from "../components/AddLiquorForm";
import Page from "../components/Page";
import PageHeader from "../components/PageHeader";

export default function AddLiquorPage({ token }) {
  return (
    <Page>
      <PageHeader title="Add Liquor" />
      <AddLiquorForm setToken={token} />
    </Page>
  );
}
