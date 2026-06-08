import { useMemo, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "./App.css";
import failuresJson from "../../reports/failures.json";
import historyJson from "../../reports/test-history.json";

type Failure = {
  timestamp: string;
  category: string;
  rootCause: string;
  fixSuggestion: string;
  confidence: number;
  severity: string;
};

type TestHistory = {
  timestamp: string;
  testName: string;
  status: string;
};

type ChartDatum = {
  name: string;
  value: number;
};

type FlakyTest = {
  name: string;
  score: number;
};

type TrendDatum = {
  date: string;
  successRate: number;
};

const failures = failuresJson as Failure[];
const history = historyJson as TestHistory[];

const CHART_COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626"];

function countBy<T>(items: T[], getKey: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function toChartData(counts: Record<string, number>): ChartDatum[] {
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function getFlakyTests(items: TestHistory[]): FlakyTest[] {
  const testStats = items.reduce<Record<string, { total: number; failed: number }>>(
    (stats, test) => {
      stats[test.testName] ??= { total: 0, failed: 0 };
      stats[test.testName].total += 1;

      if (test.status === "failed") {
        stats[test.testName].failed += 1;
      }

      return stats;
    },
    {},
  );

  return Object.entries(testStats)
    .map(([name, value]) => ({
      name,
      score: (value.failed / value.total) * 100,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function getTrendData(items: TestHistory[]): TrendDatum[] {
  const trendStats = items.reduce<Record<string, { total: number; passed: number }>>(
    (stats, test) => {
      const day = test.timestamp.split("T")[0];
      stats[day] ??= { total: 0, passed: 0 };
      stats[day].total += 1;

      if (test.status === "passed") {
        stats[day].passed += 1;
      }

      return stats;
    },
    {},
  );

  return Object.entries(trendStats)
    .map(([date, value]) => ({
      date,
      successRate: Number(((value.passed / value.total) * 100).toFixed(1)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <section className="stat-card">
      <h3>{label}</h3>
      <strong>{value}</strong>
    </section>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="chart-frame">{children}</div>
    </section>
  );
}

function FailureDetails({ failure }: { failure: Failure | null }) {
  if (!failure) {
    return null;
  }

  return (
    <section className="panel failure-details">
      <h2>Failure Details</h2>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>{failure.category}</dd>
        </div>
        <div>
          <dt>Severity</dt>
          <dd>{failure.severity}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{failure.confidence}</dd>
        </div>
      </dl>
      <h3>Root Cause</h3>
      <p>{failure.rootCause}</p>
      <h3>Fix Suggestion</h3>
      <p>{failure.fixSuggestion}</p>
    </section>
  );
}

function RecentFailuresTable({
  failures,
  onSelect,
}: {
  failures: Failure[];
  onSelect: (failure: Failure) => void;
}) {
  return (
    <section className="panel">
      <h2>Recent Failures</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {failures.map((failure) => (
            <tr key={`${failure.timestamp}-${failure.category}`} onClick={() => onSelect(failure)}>
              <td>{failure.timestamp}</td>
              <td>{failure.category}</td>
              <td>{failure.severity}</td>
              <td>{failure.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function FlakyTestsTable({ tests }: { tests: FlakyTest[] }) {
  return (
    <section className="panel">
      <h2>Top Flaky Tests</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Flaky %</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.name}>
              <td>{test.name}</td>
              <td>{test.score.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function App() {
  const [selectedFailure, setSelectedFailure] = useState<Failure | null>(null);

  const dashboardData = useMemo(() => {
    const totalTests = history.length;
    const passedTests = history.filter((test) => test.status === "passed").length;
    const failedTests = history.filter((test) => test.status === "failed").length;

    return {
      categoryData: toChartData(countBy(failures, (failure) => failure.category)),
      failedTests,
      flakyTests: getFlakyTests(history),
      passedTests,
      recentFailures: [...failures].reverse().slice(0, 10),
      severityData: toChartData(countBy(failures, (failure) => failure.severity)),
      successRate: totalTests ? ((passedTests / totalTests) * 100).toFixed(1) : "0",
      totalTests,
      trendData: getTrendData(history),
    };
  }, []);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>QA Analytics Dashboard</h1>
      </header>

      <section className="stats-grid" aria-label="Test summary">
        <StatCard label="Total Tests" value={dashboardData.totalTests} />
        <StatCard label="Passed" value={dashboardData.passedTests} />
        <StatCard label="Failed" value={dashboardData.failedTests} />
        <StatCard label="Success Rate" value={`${dashboardData.successRate}%`} />
      </section>

      <section className="charts-grid">
        <ChartCard title="Failure Categories">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dashboardData.categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Severity Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Success Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="successRate" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="tables-grid">
        <RecentFailuresTable failures={dashboardData.recentFailures} onSelect={setSelectedFailure} />
        <FlakyTestsTable tests={dashboardData.flakyTests} />
      </section>

      <FailureDetails failure={selectedFailure} />
    </main>
  );
}

export default App;
