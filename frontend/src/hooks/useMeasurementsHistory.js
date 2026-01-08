import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export function useMeasurementsHistory(limit = 60) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error } = await supabase
        .from("measurements")
        .select("*")
        .order("db_committed_at", { ascending: true })
        .limit(limit);

      if (!error && data) {
        setHistory(
          data.map((row) => ({
            time: new Date(row.db_committed_at).getTime(),
            temperature: row.temperature,
            sourceToBackend:
              row.backend_received_at - row.source_sent_at,
            backendToDb:
              row.db_committed_at - row.backend_received_at,
            dbToClient: 0,
            endToEnd: 0,
          }))
        );
      }
    }

    fetchHistory();
  }, [limit]);

  return history;
}
