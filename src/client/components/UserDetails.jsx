import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiHook } from "../hooks/useApi";
import { LiquorReviews } from "./LiquorReviews";
import { RemoveLiquorButton } from "./RemoveLiquorButton";
import { UpdateLiquorForm } from "./UpdateLiquorForm";

function UserDetails({ token = "", user }) {
  const [mode, setMode] = useState("view");

  const { itemId: userId } = useParams();

  const { data: user, isLoading, error } = useApiHook(`/users/${userId}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="details">
      {user.id ? (
        <div className="single-user">
          {!user?.is_admin ? (
            <Fragment>
              <h2>{user.name}</h2>
              <LiquorReviews liquorId={user.id} token={token} />
            </Fragment>
          ) : mode === "view" ? (
            <Fragment>
              <h2>{user.name}</h2>
              <button onClick={() => setMode("edit")}>Edit</button>
              <RemoveLiquorButton token={token} liquorId={user.id} />
              <LiquorReviews liquorId={user.id} token={token} />
            </Fragment>
          ) : (
            <UpdateLiquorForm
              token={token}
              liquorId={user.id}
              setMode={setMode}
              liquorName={user.name}
              liquorDescription={user.description}
              liquorImageUrl={user.imageurl}
              liquorPrice={user.price}
              liquorAlcoholContent={user.alcohol_content}
              liquorCategory={user.category}
            />
          )}
        </div>
      ) : (
        <h1>No user was found with ID: "{userId}". Try again.</h1>
      )}
    </div>
  );
}

export default User;
