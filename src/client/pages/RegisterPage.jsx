import React from "react";
import PageHeader from "../components/PageHeader";
import RegisterForm from "../components/RegisterForm";
import Page from "../components/Page";

export default function RegisterPage({ setToken }) {
  return (
    <Page>
      <PageHeader title="Register" />
      <RegisterForm setToken={setToken} />
    </Page>
  );
}
