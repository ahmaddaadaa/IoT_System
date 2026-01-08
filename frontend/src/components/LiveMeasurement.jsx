export default function LiveMeasurement({ data }) {
  if (!data) {
    return <p>Waiting for data…</p>;
  }

  return (
    <>
      <h2>{data.temperature.toFixed(2)} °C</h2>
      <p>Time: {new Date(data.timestamp).toLocaleTimeString()}</p>
      <p>Radio: {data.radio_type}</p>
      <p>Session: {data.session_id}</p>
    </>
  );
}
