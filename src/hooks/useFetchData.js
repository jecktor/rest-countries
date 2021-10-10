import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { loading, error, data };
};

export default useFetchData;
