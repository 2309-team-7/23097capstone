import React from "react";

const API = ""

export async function fetchItems() {
    const response = await Axios.get(`${API}/items`);
    return response;
  }

  export default function ItemList() {
    const [searchText, setSearchText] = useState("");
    const [items, setItems] = useState();
    useEffect(() => {
      async function getAndSetItems() {
        try {
          const response = await fetchItems();
          setItems(response.data.items || []);
        } catch (error) {
          console.log(error);
        }
      }
      getAndSetItems();
    }, []);

    const itemsToList = searchText
    ? items.filter(
        (item) => item?.title?.toLowerCase().includes(searchText.toLowerCase()) // Using optional chaining
      )
    : books;

    return (
        <ul className={"PLACEHOLDER"}>
          {!itemsToList ? (
            <h3>Loading...</h3>
          ) : itemsToList.length ? (
            <>
              <input
                placeholder="Search..."
                onChange={(event) => setSearchText(event.target.value)}
              />
              {itemsToList.map((item) => {
                return (
                  <li key={item.id}>
                    {" "}
                    <Link to={`/${item.id}`}>
                      <h3>{item.title}</h3>
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <h3>No Books Found!</h3>
          )}
        </ul>
      );
    }