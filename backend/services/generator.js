import { supabase } from "../db/connection.js";

export function startGenerator() {
  console.log("✅ Generator started");

  setInterval(async () => {
    const temperature = 20 + Math.random() * 10;

    const source_sent_at = Date.now();
    const backend_received_at = Date.now();

    const { error } = await supabase
      .from("measurements")
      .insert({
        temperature,
        source_sent_at,
        backend_received_at,
        db_committed_at: Date.now(),
        radio_type: "SIMULATED",
        session_id: "stage-1"
      });

    if (error) {
      console.error("❌ Insert error:", error.message);
    }
  }, 1000);
}
