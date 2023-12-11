import { useEffect, useState } from "react";

export const useApiHook = (url, token) => {
  const [data, setData] = useState([]); // Assuming data is an array
  const [isLoading, setIsLoading] = useState(false); // Set initial loading state to false
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      if (isMounted) {
        setIsLoading(true); // Set loading to true right before fetching data
      }
      try {
        const response = await fetch(`http://localhost:3000/api${url}`, {
          headers: token
            ? {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            : {
                "Content-Type": "application/json",
              },
          signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError" && isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false); // Set loading to false after fetching data
        }
      }
    };

    fetchData();

    // Cleanup function to abort fetch and handle unmounting
    return () => {
      isMounted = false; // Indicate the component has been unmounted
      abortController.abort();
    };
  }, [url]); // Only re-run the effect if the URL changes

  return { data, isLoading, error };
};
