const modulee = require("../Model/Module.model");
const project = require("../Model/Project.model")
const log = require("../Model/Log.model");
const mongoose = require('mongoose');


const createModule = async (req, res) => {
    try {
        const createdById = req.user.id;
        const { moduleName, subModule, projectId } = req.body;
        console.log(req.body);
        const mod = await modulee.findOne({ moduleName });
        if (mod) {
            return res.json({ msg: "Module already Exist" });
        }
        else {
            const creat = await modulee.create({
                moduleName: moduleName,
                subModule: subModule,
                projectId: projectId,
                createdBy: createdById,
            })
            console.log(creat);
            const associatedProject = await project.findById(projectId);
            if (!associatedProject) {
                return res.status(404).json({ msg: "Project not found" });
            }
            const path = `${associatedProject.projectName}/${creat.moduleName}`;
            try {
                await log.create({
                    action: "Created",
                    entityType: "Module",
                    entityId: creat._id,
                    user: createdById,
                    timestamp: Date.now(),
                    path :path,
                    details: `Created Module : ${moduleName}`,

                })
            }
            catch (err) {
                console.log(err);

            }

            return res.json({ msg: "Module Created Successfully", data: creat });
        }
    }
    catch (err) {
        console.log("Error :" + err);
    }
}

//getModule

const getModules = async (req, res) => {
  try {
    const { projectId } = req.params;
    console.log("Received projectId:", projectId);

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ msg: "Invalid Project ID" });
    }
    console.log("ProjectId validated");

    // Find the project
    const proj = await project.findById(projectId);
    if (!proj) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Find modules associated with the projectId
    const modules = await modulee.find({ projectId: projectId });
    console.log("Modules found:", modules); // Add this for debugging

    // Check if any modules were found
    if (modules.length === 0) {
      return res.status(404).json({ msg: "No modules found for this project" });
    }

    // Respond with modules
    res.status(200).json({msg:"Module Fetched Success", data: modules });
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ msg: "Failed to fetch modules" });
  }
};





module.exports = { createModule,getModules };