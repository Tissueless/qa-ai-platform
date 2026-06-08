import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  LineChart,
  Line
} from "recharts";

import failures
  from "../../reports/failures.json";

import { useState }
  from "react";

import history
  from "../../reports/test-history.json";

  
function App() {

  const COLORS = [
 "#0088FE",
 "#00C49F",
 "#FFBB28",
 "#FF8042"
];

  const [
    selectedFailure,
    setSelectedFailure
  ] = useState<
    typeof failures[number]
    | null
  >(
    null
  );

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

  const totalTests =
    history.length;

  const passedTests =
    history.filter(
      test =>
        test.status ===
        "passed"
    ).length;

  const failedTests =
    history.filter(
      test =>
        test.status ===
        "failed"
    ).length;

  const successRate =
    totalTests
      ? (
          (
            passedTests /
            totalTests
          ) * 100
        ).toFixed(1)
      : "0";

  const flakyMap:
    Record<
      string,
      {
        total: number;
        failed: number;
      }
    >
  = {};

  history.forEach(test => {

    if (
      !flakyMap[
        test.testName
      ]
    ) {

      flakyMap[
        test.testName
      ] = {
        total: 0,
        failed: 0
      };
    }

    flakyMap[
      test.testName
    ].total++;

    if (
      test.status ===
      "failed"
    ) {

      flakyMap[
        test.testName
      ].failed++;
    }
  });

  const flakyTests =
    Object.entries(
      flakyMap
    )
      .map(
        ([name, value]) => ({
          name,

          score:
            (
              value.failed /
              value.total
            ) * 100
        })
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      )
      .slice(0, 5);
  const recentFailures =
  [...failures]
    .reverse()
    .slice(0, 10);
  
  const trendMap:
  Record<
    string,
    {
      total: number;
      passed: number;
    }
  > = {};

history.forEach(test => {

  const day =
    test.timestamp
      .split("T")[0];

  if (
    !trendMap[day]
  ) {

    trendMap[day] = {
      total: 0,
      passed: 0
    };
  }

  trendMap[day].total++;

  if (
    test.status ===
    "passed"
  ) {

    trendMap[day].passed++;
  }
});

const trendData =
  Object.entries(
    trendMap
  )
    .map(
      ([date, value]) => ({
        date,

        successRate:
          Number(
            (
              value.passed /
              value.total *
              100
            ).toFixed(1)
          )
      })
    )
    .sort(
      (a, b) =>
        a.date.localeCompare(
          b.date
        )
    );

  return (

    <div
      style={{
        padding: 40,
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      <h1>
        QA Analytics Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 40
        }}
      >

        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: 180
          }}
        >
          <h3>Total Tests</h3>

          <h1
            style={{
              margin: 0
            }}
          >
            {totalTests}
          </h1>
        </div>
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: 180
          }}
        >
          <h3>Passed</h3>

          <h1
            style={{
              margin: 0
            }}
          >
            {passedTests}
          </h1>
        </div>
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: 180
          }}
        >
          <h3>Failed</h3>

          <h1
            style={{
              margin: 0
            }}
          >
            {failedTests}
          </h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
            minWidth: 180
          }}
        >
          <h3>Success Rate</h3>

          <h1
            style={{
              margin: 0
            }}
          >
            {successRate}
          </h1>
        </div>

      </div>

<div className="card">

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
      </div>
<div
  style={{
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: 30
  }}
>
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

<h2
  style={{
    marginTop: 40
  }}
>
  Success Trend
</h2>

<LineChart
  width={700}
  height={300}
  data={trendData}
>

  <CartesianGrid />

  <XAxis
    dataKey="date"
  />

  <YAxis
    domain={[0, 100]}
  />

  <Tooltip />

  <Line
    type="monotone"
    dataKey="successRate"
  />

</LineChart>
      <h2
        style={{
          marginTop: 40
        }}
      >
        Top Flaky Tests
      </h2>
<h2
  style={{
    marginTop: 40
  }}
>
  Recent Failures
</h2>
{
  selectedFailure && (

    <div
      style={{
        marginTop: 40,
        padding: 20,
        border:
          "1px solid #ddd",
        borderRadius: 8
      }}
    >

      <h2>
        Failure Details
      </h2>

      <p>
        <strong>
          Category:
        </strong>
        {" "}
        {
          selectedFailure.category
        }
      </p>

      <p>
        <strong>
          Severity:
        </strong>
        {" "}
        {
          selectedFailure.severity
        }
      </p>

      <p>
        <strong>
          Confidence:
        </strong>
        {" "}
        {
          selectedFailure.confidence
        }
      </p>

      <h3>
        Root Cause
      </h3>

      <p>
        {
          selectedFailure.rootCause
        }
      </p>

      <h3>
        Fix Suggestion
      </h3>

      <p>
        {
          selectedFailure.fixSuggestion
        }
      </p>

    </div>
  )
}
<table
  style={{
    borderCollapse:
      "collapse",
    width: "100%"
  }}
>

  <thead>

    <tr>

      <th>
        Timestamp
      </th>

      <th>
        Category
      </th>

      <th>
        Severity
      </th>

      <th>
        Confidence
      </th>

    </tr>

  </thead>

  <tbody>

    {recentFailures.map(
      (
        failure,
        index
      ) => (

        <tr
  key={index}
  onClick={() =>
    setSelectedFailure(
      failure
    )
  }
  style={{
    cursor: "pointer"
  }}
>

          <td>
            {
              failure.timestamp
            }
          </td>

          <td>
            {
              failure.category
            }
          </td>

          <td>
            {
              failure.severity
            }
          </td>

          <td>
            {
              failure.confidence
            }
          </td>

        </tr>
      )
    )}

  </tbody>

</table>
      <table>

        <thead>
          <tr>
            <th>
              Test
            </th>

            <th>
              Flaky %
            </th>
          </tr>
        </thead>

        <tbody>

          {flakyTests.map(
            test => (

              <tr
                key={
                  test.name
                }
              >

                <td>
                  {test.name}
                </td>

                <td>
                  {test.score.toFixed(
                    1
                  )}
                  %
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );

}

export default App;