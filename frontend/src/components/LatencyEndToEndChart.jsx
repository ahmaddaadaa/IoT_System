import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LatencyEndToEndChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-title">Latency Breakdown</div>

      <div className="chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="ts"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickCount={5} // 👈 fewer labels
              interval="preserveStartEnd"
              tickFormatter={(v) =>
                new Date(v).toLocaleTimeString([], {
                  minute: "2-digit",
                  second: "2-digit",
                })
              }
            />

            <YAxis domain={[0, "auto"]} />

            <Tooltip labelFormatter={(v) => new Date(v).toLocaleTimeString()} />

            {/* <Legend /> */}

            <Line dataKey="sourceToBackend" stroke="#22c55e" dot={false} />
            <Line dataKey="backendToDb" stroke="#f97316" dot={false} />
            <Line dataKey="dbToClient" stroke="#3b82f6" dot={false} />
            <Line
              dataKey="endToEnd"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
