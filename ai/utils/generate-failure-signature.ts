export function
generateFailureSignature(
  report: any
) {

  const category =
    report.category || "UNKNOWN";

  const severity =
    report.severity || "unknown";

  const rootCause =
    (
      report.rootCause || ""
    )
      .toLowerCase();

  if (
    category ===
    "SELECTOR_FAILURE"
  ) {

    return
      "SELECTOR_FAILURE";
  }

  if (
    category ===
    "TIMEOUT"
  ) {

    if (
      rootCause.includes(
        "locator"
      )
    ) {

      return
        "TIMEOUT_LOCATOR";
    }

    if (
      rootCause.includes(
        "navigation"
      )
    ) {

      return
        "TIMEOUT_NAVIGATION";
    }

    return "TIMEOUT";
  }

  if (
    category ===
    "ASSERTION_FAILURE"
  ) {

    return
      "ASSERTION_FAILURE";
  }

  return `${category}_${severity}`;
}