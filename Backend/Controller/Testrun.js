const testRunModel = require("../Model/Testrun.model");
const testScenarioModel = require("../Model/Scenarios.model");

const getAllTestRuns = async (req, res) => {
  try {
    // Step 1: Fetch all test scenarios
    const scenarios = await testScenarioModel.find();

    if (!scenarios || scenarios.length === 0) {
      return res.status(404).json({ msg: "No test scenarios found" });
    }

    // Step 2: Iterate over all scenarios and calculate the test stats
    const result = [];

    for (const scenario of scenarios) {
      // Step 3: Fetch all test runs associated with the scenario
      const testRuns = await testRunModel.find({ scenarioId: scenario._id });

      if (testRuns && testRuns.length > 0) {
        // Step 4: Group test runs by testRegion
        const regionsMap = new Map();

        testRuns.forEach(run => {
          const region = run.testRegion;
          if (!regionsMap.has(region)) {
            regionsMap.set(region, { passed: 0, failed: 0, total: 0 });
          }
          const regionData = regionsMap.get(region);
          regionData.total += 1;
          regionData.passed += run.testStatus === "pass" ? 1 : 0;
          regionData.failed += run.testStatus === "fail" ? 1 : 0;
        });

        // Step 5: Create a result object for each scenario with the region-specific details
        const regionsDetails = [];
        for (const [region, stats] of regionsMap.entries()) {
          const overallStatus = stats.failed === 0 ? "pass" : "fail";
          regionsDetails.push({
            testRegion: region,
            totalTestCases: stats.total,
            passedTestCases: stats.passed,
            failedTestCases: stats.failed,
            overallTestStatus: overallStatus,
          });
        }

        // Step 6: Add the scenario data with its associated regions
        result.push({
          taskId: scenario.taskId,
          subTaskId: scenario.subTaskId,
          scenarioName: scenario.scenarioName,
          regions: regionsDetails,  // Include details for each region
        });
      } else {
        // If no test runs found for a scenario, mark as no test cases
        result.push({
          taskId: scenario.taskId,
          subTaskId: scenario.subTaskId,
          scenarioName: scenario.scenarioName,
          regions: [],  // No regions, no test runs
        });
      }
    }

    // Step 7: Send the response with all scenarios and their region-specific details
    return res.status(200).json(result);

  } catch (error) {
    console.error("Error in getAllTestScenarios:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getAllTestRuns };
