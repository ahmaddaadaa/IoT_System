import { supabase } from "../db/connection.js";

export function startGenerator() {
  console.log("📡 Generator started");

  setInterval(async () => {
    const temperature = 20 + Math.random() * 10;

    const { error } = await supabase
      .from("measurements")
      .insert({
        timestamp: Date.now(),
        temperature,
        radio_type: "SIMULATED",
        session_id: "stage-1"
      });

    if (error) {
      console.error("❌ Insert error:", error.message);
    } else {
      console.log(`✅ Inserted: ${temperature.toFixed(2)} °C`);
    }
  }, 1000);
}