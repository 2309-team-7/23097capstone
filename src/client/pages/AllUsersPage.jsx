import React from "react";
import Page from "../components/Page";
import PageHeader from "../components/PageHeader";
import { useApiHook } from "../hooks/useApi";

export default function AllUserPage({ token }) {
  return (
    <Page>
      <PageHeader title="All Users" />
      <UserList token={token} />
    </Page>
  );
}

function UserList({ token }) {
  const { data, isLoading, error } = useApiHook("/users", token);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        <li>user1</li>
        <li>user2</li>
        <li>user3</li>
      </ul>
    </div>
  );
}
