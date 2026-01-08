import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export function useRealtimeMeasurements() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const channel = supabase
      .channel("measurements-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "measurements"
        },
        (payload) => {
          setLatest(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return latest;
}
