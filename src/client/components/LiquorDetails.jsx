import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiHook } from "../hooks/useApi";
import { LiquorReviews } from "./LiquorReviews";
import { RemoveLiquorButton } from "./RemoveLiquorButton";
import { UpdateLiquorForm } from "./UpdateLiquorForm";

function LiquorDetails({ token = "", user }) {
  const [mode, setMode] = useState("view");

  const { itemId } = useParams();

  const { data: item, isLoading, error } = useApiHook(`/items/${itemId}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="details">
      {item.id ? (
        <div className="single-liquor">
          {!user?.is_admin ? (
            <Fragment>
              <h2>{item.name}</h2>
              <img id="liqpic" src={item.imageurl} />
              <h4>{item.description}</h4>
              <h4>${item.price}</h4>
              <h4>{item.alcohol_content}</h4>
              <h4>{item.category}</h4>
              <LiquorReviews liquorId={item.id} token={token} />
            </Fragment>
          ) : mode === "view" ? (
            <Fragment>
              <h2>{item.name}</h2>
              <button onClick={() => setMode("edit")}>Edit</button>
              <RemoveLiquorButton token={token} liquorId={item.id} />
              <LiquorReviews liquorId={item.id} token={token} />
            </Fragment>
          ) : (
            <UpdateLiquorForm
              token={token}
              liquorId={item.id}
              setMode={setMode}
              liquorName={item.name}
              liquorDescription={item.description}
              liquorImageUrl={item.imageurl}
              liquorPrice={item.price}
              liquorAlcoholContent={item.alcohol_content}
              liquorCategory={item.category}
            />
          )}
        </div>
      ) : (
        <h1>No item was found with ID: "{itemId}". Try again.</h1>
      )}
    </div>
  );
}

export default LiquorDetails;
