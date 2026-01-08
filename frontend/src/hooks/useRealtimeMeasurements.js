import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export function useRealtimeMeasurements() {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-measurements")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "measurements" },
        (payload) => {
          const row = payload.new;

          // CLIENT receive time
          const clientReceivedAt = Date.now();

          // === CORRECT LATENCY COMPUTATION ===
          const ts = row.db_committed_at;

          const sourceToBackend =
            row.backend_received_at - row.source_sent_at;

          const backendToDb =
            row.db_committed_at - row.backend_received_at;

          const dbToClient =
            clientReceivedAt - row.db_committed_at;

          const endToEnd =
            clientReceivedAt - row.source_sent_at;

          const point = {
            ts,
            temperature: row.temperature,
            sourceToBackend,
            backendToDb,
            dbToClient,
            endToEnd
          };

          // Append, keep last 60 points
          setData((prev) => [...prev.slice(-59), point]);
          setLatest(point);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, latest };
}
