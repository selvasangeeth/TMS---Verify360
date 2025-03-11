const modulee = require("../Model/Module.model");
const project = require("../Model/Project.model");
const log = require("../Model/Log.model");  // Ensure this is the correct log model
const scenario = require("../Model/Scenarios.model");

// Create Scenario 
const createScenario = async (req, res) => {
  try {
    const createdById = req.user.id;
    console.log("Request body:", req.body);
    
    const { scenarioIdstr, moduleId, taskId, subTaskId, description, projectId } = req.body;
    
    if (!scenarioIdstr) {
      return res.status(400).json({ msg: "scenarioIdstr is required" });
    }

    // Check if the scenario already exists
    const scenar = await scenario.findOne({ scenarioIdstr });
    if (scenar) {
      return res.json({ msg: "Scenario already exists" });
    } else {
      // Create the scenario
      const creat = await scenario.create({
        scenarioIdstr: scenarioIdstr,  
        module: moduleId,             
        taskId: taskId,
        subTaskId: subTaskId,
        scenarioDescription: description,  
        createdBy: createdById,
      });

      // Retrieve associated Module and Project
      const associatedModule = await modulee.findById(moduleId);
      const associatedProject = await project.findById(projectId);
      
      if (!associatedModule) {
        return res.status(404).json({ msg: "Module not found" });
      }

      // Log creation
      console.log("Log creation started");
      console.log(associatedProject.projectName)
      console.log(associatedModule.moduleName)
      console.log(creat.scenarioIdstr)
      const path = `${associatedProject.projectName}/${associatedModule.moduleName}/${creat.scenarioIdstr}`;
      try {
        // Ensure log.create() is called correctly
        const logEntry = await log.create({
          action: "Created",
          entityType: "Scenario",
          entityId: creat._id,
          user: createdById,
          timestamp: Date.now(),
          path: path,
          details: `Created Scenario: ${scenarioIdstr}`,
        });
        
        console.log("Log entry created:", logEntry);
      } catch (err) {
        console.log("Error creating log:", err);
      }

      return res.json({ msg: "Scenario Created Successfully", data: creat });
    }
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ msg: "Server error, please try again later." });
  }
};

  // get Scenario 

  const getScenario= async (req, res) => {
    try {
      const moduleId = req.params.moduleId; 

      const mod = await modulee.findById(moduleId);
      if (!mod) {
        return res.status(404).json({ msg: "Module not found" });
      }
      const sc = await scenario.find({ module: moduleId });

      if (sc.length === 0) {
        return res.status(404).json({ msg: "No Scenario found for this project" });
      }
      res.status(200).json({msg :"Success Scenario Fetch",data : sc });
    } catch (err) {
      console.error("Error fetching Scenarios:", err);
      res.status(500).json({ msg: "Failed to fetch Scenarios" });
    }
  };



  module.exports = {createScenario,getScenario};