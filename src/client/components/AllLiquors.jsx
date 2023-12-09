import { useState, useEffect } from "react";
import Axios from "axios";
import { useApiHook } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

function AllLiquors() {
  const [items, setLiquors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLiquors();
  }, []);

  async function fetchLiquors() {
    let API = "http://localhost:5432/2309-7-db/api/";

    try {
      const { data: response } = await Axios.get(`${API}/items`);
      setLiquors(response.data.items);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <ul className="liquors-container">
      {items.length ? (
        items.map((item) => {
          return (
            <li key={item.item_id}>
              <h3>{item.name}</h3>
              <img src={item.imageUrl} />
              <button onClick={() => navigate(`${API}/items/:${item.id}`)}>
                Reviews
              </button>
            </li>
          );
        })
      ) : (
        <h2>Loading ...</h2>
      )}
    </ul>
  );
}

export default AllLiquors;
