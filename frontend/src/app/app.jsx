import { useRealtimeMeasurements } from "../hooks/useRealtimeMeasurements";
import LiveMeasurement from "../components/LiveMeasurement";

export default function App() {
  const data = useRealtimeMeasurements();

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Live Measurement Stream</h1>
      <LiveMeasurement data={data} />
    </div>
  );
}
