import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar
} from "recharts";

import failures
  from "../../reports/failures.json";

function App() {

  const categoryMap:
    Record<string, number>
  = {};

  const severityMap:
    Record<string, number>
  = {};

  for (const failure of failures) {

    categoryMap[
      failure.category
    ] =

      (
        categoryMap[
          failure.category
        ] || 0
      ) + 1;

    severityMap[
      failure.severity
    ] =

      (
        severityMap[
          failure.severity
        ] || 0
      ) + 1;
  }

  const categoryData =
    Object.entries(
      categoryMap
    ).map(([name, value]) => ({
      name,
      value
    }));

  const severityData =
    Object.entries(
      severityMap
    ).map(([name, value]) => ({
      name,
      value
    }));

  return (

    <div
      style={{
        padding: 40
      }}
    >

      <h1>
        QA Analytics Dashboard
      </h1>

      <h2>
        Failure Categories
      </h2>

      <PieChart
        width={400}
        height={300}
      >

        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {categoryData.map(
            (_, index) => (

              <Cell
                key={index}
              />
            )
          )}

        </Pie>

        <Tooltip />

      </PieChart>

      <h2>
        Severity Distribution
      </h2>

      <BarChart
        width={500}
        height={300}
        data={severityData}
      >

        <CartesianGrid />

        <XAxis
          dataKey="name"
        />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
        />

      </BarChart>

    </div>
  );
}

export default App;