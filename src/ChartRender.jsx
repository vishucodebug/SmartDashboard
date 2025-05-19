import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#EF4444", "#8884d8", "#82ca9d"];

export const renderChart = (widget) => {
  if (widget.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={widget.data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#00C49F"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="medium"
            stroke="#FFBB28"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#EF4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (widget.chartType === "bar") {
    const keys = Object.keys(widget.data[0]).filter((k) => k !== "name");
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={widget.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={widget.data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          dataKey="value"
          label={{ fill: "#555", fontWeight: "bold" }}
        >
          {widget.data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
