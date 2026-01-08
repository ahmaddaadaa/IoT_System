import "../styles/dashboard.css";
import TemperatureChart from "../components/TemperatureChart";
import LatencyEndToEndChart from "../components/LatencyEndToEndChart";
import LiveMeasurement from "../components/LiveMeasurement";
import { useRealtimeMeasurements } from "../hooks/useRealtimeMeasurements";

export default function App() {
  const { data, latest } = useRealtimeMeasurements();

  return (
    <div className="dashboard">
      <h1>IoT Latency Dashboard</h1>
      <p>Session: stage-1 · Radio: SIMULATED</p>

      <div className="chart-grid">
        <TemperatureChart data={data} />
        <LatencyEndToEndChart data={data} />
      </div>

      <LiveMeasurement latest={latest} />
    </div>
  );
}
