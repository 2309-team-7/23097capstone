import React from "react";
import PageHeader from "../components/PageHeader";
import LoginForm from "../components/LoginForm";
import Page from "../components/Page";

export default function LogInPage({ token, setToken }) {
  return (
    <Page>
      <PageHeader title="Log In" />
      <LoginForm setToken={setToken} />
    </Page>
  );
}
