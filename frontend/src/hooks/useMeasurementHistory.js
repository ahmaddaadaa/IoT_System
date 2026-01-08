import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export function useMeasurementHistory(limit = 60) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error } = await supabase
        .from("measurements")
        .select("timestamp, temperature")
        .order("timestamp", { ascending: true })
        .limit(limit);

      if (!error && data) {
        setHistory(
          data.map((r) => ({
            time: new Date(r.timestamp).toLocaleTimeString(),
            temperature: r.temperature
          }))
        );
      }
      setLoading(false);
    }
    fetchHistory();
  }, [limit]);

  return { history, setHistory, loading };
}
