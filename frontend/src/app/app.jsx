import { useRealtimeMeasurements } from "../hooks/useRealtimeMeasurements";
import { useMeasurementHistory } from "../hooks/useMeasurementHistory";
import LiveMeasurement from "../components/LiveMeasurement";
import TemperatureChart from "../components/TemperatureChart";

const WINDOW = 60;

export default function App() {
  const latest = useRealtimeMeasurements();
  const { history, setHistory, loading } = useMeasurementHistory(WINDOW);

  // Append realtime data to history
  if (latest && history.length) {
    const lastTime = history[history.length - 1]?.time;
    const newTime = new Date(latest.timestamp).toLocaleTimeString();

    if (newTime !== lastTime) {
      const next = [
        ...history,
        { time: newTime, temperature: latest.temperature }
      ].slice(-WINDOW);
      setHistory(next);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Live Measurement Dashboard</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Current Measurement</h2>
        <LiveMeasurement data={latest} />
      </section>

      <section>
        <h2>Temperature History (Rolling)</h2>
        {loading ? <p>Loading history…</p> : <TemperatureChart data={history} />}
      </section>
    </div>
  );
}
