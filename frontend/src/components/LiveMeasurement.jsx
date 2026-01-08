export default function LiveMeasurement({ latest }) {
  if (!latest) return null;

  return (
    <div className="live-grid">
      <div className="live-card">
        Temp
        <strong>{latest.temperature.toFixed(2)} °C</strong>
      </div>

      <div className="live-card">
        Src → BE
        <strong>{latest.sourceToBackend} ms</strong>
      </div>

      <div className="live-card">
        BE → DB
        <strong>{latest.backendToDb} ms</strong>
      </div>

      <div className="live-card">
        DB → Client
        <strong>{latest.dbToClient} ms</strong>
      </div>

      <div className="live-card alert">
        End-to-End
        <strong>{latest.endToEnd} ms</strong>
      </div>
    </div>
  );
}
