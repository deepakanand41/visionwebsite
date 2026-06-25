import { useEffect, useState } from 'react';
import { fetchAccreditations } from '../services/api';

export function useAccreditations() {
  const [accreditations, setAccreditations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccreditations()
      .then(setAccreditations)
      .catch(() => setAccreditations([]))
      .finally(() => setLoading(false));
  }, []);

  return { accreditations, loading };
}
