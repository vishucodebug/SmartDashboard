export const samplePieData = (data) =>
  data.map((entry) => ({ name: entry.name, value: entry.value }));

export const widgetLibrary = {
  CSPM: [
    {
      id: "w1",
      name: "Cloud Accounts",
      description: "Overview of cloud accounts connectivity status.",
      chartType: "pie",
      data: samplePieData([
        { name: "Connected", value: 2 },
        { name: "Not Connected", value: 0 },
      ]),
    },
    {
      id: "w2",
      name: "Cloud Account Risk Assessment",
      description: "Distribution of risk assessments across accounts.",
      chartType: "pie",
      data: samplePieData([
        { name: "Failed", value: 1689 },
        { name: "Warning", value: 681 },
        { name: "Not available", value: 36 },
        { name: "Passed", value: 7253 },
      ]),
    },
    {
      id: "w3",
      name: "Cloud  Risk Assessment",
      description: "Risk management.",
      chartType: "pie",
      data: samplePieData([
        { name: "Failed", value: 1089 },
        { name: "Warning", value: 981 },
        { name: "Not available", value: 26 },
        { name: "Passed", value: 753 },
      ]),
    },
  ],
  CWPP: [
    {
      id: "w3",
      name: "Risk Trends",
      description: "Shows risk trends across workloads.",
      chartType: "pie",
      data: samplePieData([
        { name: "Critical", value: 12 },
        { name: "High", value: 70 },
        { name: "Low", value: 130 },
      ]),
    },
    {
      id: "w4",
      name: "Runtime Protection",
      description: "Status of runtime protection mechanisms.",
      chartType: "pie",
      data: samplePieData([
        { name: "Enabled", value: 55 },
        { name: "Disabled", value: 10 },
      ]),
    },
  ],
  Image: [
    {
      id: "w5",
      name: "Image Scan Overview",
      description: "Summary of scanned images based on safety status.",
      chartType: "pie",
      data: samplePieData([
        { name: "Safe", value: 50 },
        { name: "Unsafe", value: 20 },
      ]),
    },
    {
      id: "w6",
      name: "Vulnerability Distribution",
      description: "Breakdown of vulnerabilities in scanned images.",
      chartType: "pie",
      data: samplePieData([
        { name: "Low", value: 100 },
        { name: "Medium", value: 50 },
        { name: "High", value: 10 },
      ]),
    },
  ],
  Ticket: [
    {
      id: "w7",
      name: "Ticket Resolution",
      description: "Status of open and resolved tickets.",
      chartType: "pie",
      data: samplePieData([
        { name: "Open", value: 30 },
        { name: "Closed", value: 100 },
      ]),
    },
    {
      id: "w8",
      name: "SLA Breach Count",
      description: "Number of SLA breaches vs compliance.",
      chartType: "pie",
      data: samplePieData([
        { name: "Breached", value: 5 },
        { name: "Within SLA", value: 95 },
      ]),
    },
  ],
  Registry: [
    {
      id: "w9",
      name: "Image Risk Trend",
      description: "Time-based visualization of risk levels in scanned images.",
      chartType: "line",
      data: [
        { name: "Week 1", low: 10, medium: 20, high: 5 },
        { name: "Week 2", low: 15, medium: 18, high: 7 },
        { name: "Week 3", low: 20, medium: 22, high: 4 },
        { name: "Week 4", low: 18, medium: 19, high: 6 },
      ],
    },
    {
      id: "w10",
      name: "Image Risk Assessment",
      description: "Breakdown of total vulnerabilities found in images.",
      chartType: "bar",
      data: [
        {
          name: "Vulnerabilities",
          critical: 9,
          high: 950,
          medium: 400,
          low: 100,
          negligible: 10,
          unknown: 1,
        },
      ],
    },
    {
      id: "w11",
      name: "Image Security Issues",
      description: "Distribution of security issues across scanned images.",
      chartType: "bar",
      data: [
        {
          name: "Security Issues",
          critical: 2,
          high: 2,
          medium: 1,
          low: 1,
          negligible: 1,
          unknown: 1,
        },
      ],
    },
  ],
};
