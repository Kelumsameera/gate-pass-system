// src/hooks/useFetchPass.js
import { useState, useEffect, useCallback } from "react";
import { getPass } from "../services/api"; // make sure getPass is a named export in api.js

export function useFetchPass(status) {
  const [passes, setPasses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap in useCallback so it can be used in useEffect safely
  const fetchPasses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPass(status);
      setPasses(response.data);
      setLoading(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch passes");
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchPasses();
  }, [fetchPasses]);

  return { passes, loading, error, refetch: fetchPasses };
}
