import React from "react";
import LoginForm from "../components/LoginForm";
import Page from "../components/Page";
import PageHeader from "../components/PageHeader";

export default function LogInPage({ setUser, setToken }) {
  return (
    <Page>
      <PageHeader title="Log In" />
      <LoginForm setToken={setToken} setUser={setUser} />
    </Page>
  );
}
