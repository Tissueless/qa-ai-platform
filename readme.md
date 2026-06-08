![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Playwright](https://img.shields.io/badge/Playwright-E2E-green)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-orange)

# AI QA Platform

AI-powered Quality Assurance Platform built with Playwright, TypeScript, GitHub Actions, and a custom analytics dashboard.

## Overview

AI QA Platform automates the entire QA workflow:

1. Execute Playwright tests
2. Collect test artifacts (trace, screenshot, video)
3. Analyze failures using AI
4. Categorize defects
5. Detect flaky tests
6. Track historical test results
7. Visualize QA metrics in a dashboard
8. Run automatically through GitHub Actions

## Features

### Automated Testing

* Playwright-based E2E testing
* Screenshot capture on failure
* Video recording on failure
* Trace collection for debugging

### AI Failure Analysis

* Root cause analysis
* Failure categorization
* Severity classification
* Confidence scoring
* Suggested fixes

### Trend Analytics

* Failure trend tracking
* Historical test execution records
* Failure category distribution
* Severity distribution

### Flaky Test Detection

* Identify unstable tests
* Flakiness scoring
* Top flaky test reporting

### Dashboard

* Total test statistics
* Success rate tracking
* Failure category visualization
* Severity distribution charts
* Recent failure history
* Flaky test leaderboard

### CI/CD

* GitHub Actions integration
* Automated test execution
* Artifact upload
* Report generation

---

## Tech Stack

* TypeScript
* Playwright
* React
* Vite
* Recharts
* GitHub Actions
* Ollama

---

## Project Structure

```text
.
├── ai/
│   ├── agents/
│   └── utils/
│
├── qa/
│   └── playwright/
│
├── dashboard/
│   └── src/
│
├── reports/
│   ├── failures.json
│   └── test-history.json
│
├── test-results/
│
├── .github/
│   └── workflows/
│
└── playwright.config.ts
```

## Installation

```bash
git clone https://github.com/Tissueless/qa-ai-platform.git

cd qa-ai-platform

npm install
```

## Run Tests

```bash
npx playwright test
```

## Run Full QA Pipeline

```bash
npm run qa
```

Pipeline includes:

* Playwright execution
* Failure analysis
* Trend analysis
* Flaky detection
* History update

## Run Dashboard

```bash
cd dashboard

npm install

npm run dev
```

Open:

```text
http://localhost:5173
```

## GitHub Actions

The QA pipeline automatically runs on:

* Push to main
* Manual workflow execution

Generated artifacts:

* Playwright report
* Screenshots
* Videos
* Traces
* Failure analytics

## Example Dashboard Metrics

* Total Tests
* Passed Tests
* Failed Tests
* Success Rate
* Failure Categories
* Severity Distribution
* Recent Failures
* Top Flaky Tests

## Future Roadmap

* Failure Detail Panel
* Trend Forecasting
* AI Test Generation Improvements
* Slack Notifications
* Docker Support
* Multi-project Support

## License

MIT
