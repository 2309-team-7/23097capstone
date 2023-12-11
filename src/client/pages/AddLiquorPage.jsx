import React from "react";
import PageHeader from "../components/PageHeader";
import Page from "../components/Page";
import AddLiquorForm from "../components/AddLiquorForm";

export default function RegisterPage({ setToken }) {
  return (
    <Page>
      <PageHeader title="Add Liquor" />
      <AddLiquorForm setToken={setToken} />
    </Page>
  );
}
