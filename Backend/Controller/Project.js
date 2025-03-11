const ProjectDetails = require("../Model/Project.model");
const log = require("../Model/Log.model")
const userDetails = require("../Model/User.model");
const path = require('path');




// Create Project
const createProject = async (req, res) => {
    try {
        const createdById = req.user.id;
        const { projectName} = req.body;
        console.log(projectName)
        const projectLogo = req.file.filename;
        const proj = await ProjectDetails.findOne({ projectName });
        if (proj) {
            return res.json({ msg: "Project already exists" });
        }
        else {
            const creat = await ProjectDetails.create({
                projectName: projectName,
                createdBy: createdById,
                projectLogo:projectLogo
            });

            try {
                await log.create({
                    action: "Created",
                    entityType: "Project",
                    entityId: creat._id,
                    user: createdById,
                    timestamp: Date.now(),
                    path :projectName,
                    details: `Created Project : ${projectName}`,

                })
            }
            catch (err) {
                console.log(err);

            }

            return res.json({ msg: "Project Created Successfully", data: creat });
        }
    }
    catch (err) {
        console.log("Error :" + err);
    }
}

//Update Project
const updateProject = async (req, res) => {

    try {
        const { projectId, newProjectName, updatedBy } = req.body;

        const proj = await ProjectDetails.findById(projectId);
        if (!proj) {
            return res.json({ msg: "Project does not exist" });
        } else {
            oldProjectName = proj.projectName;
            proj.projectName = newProjectName;
            await proj.save();
            try {
                await log.create({
                    action: "Updated",
                    entityType: "Project",
                    entityId: projectId,
                    user: updatedBy,
                    path : proj.projectName,
                    details: ` ${oldProjectName} updated to ${newProjectName}`

                })
            }
            catch (err) {
                console.log(err);
            }
            return res.json({ msg: "Project updated successfully", data: updatedProject });
        }
    }
    catch (err) {
        console.log("Error :" + err);
    }
};

//get project based on Role
const getProject = async (req, res) => {
    try {
      const userId = req.user.id; //userId extraction from jwt
      const user = await userDetails.findById(userId); 
      const role = user.Role;
    console.log("Role "+role);
      if (role == 'admin' || role == 'user') {
        const projects = await ProjectDetails.find({ assignedTo: userId }).select('projectName'); 
        return res.status(200).json({ projects });
      }
  
      const projects = await ProjectDetails.find().select('projectName projectLogo');
      //superAdmin
      console.log(projects[0]);
      res.status(200).json({ projects });
    } catch (err) {
      console.error("Error fetching projects:", err);
      res.status(500).json({ msg: "Failed to fetch projects" });
    }
  };

  // delete Project
  const deleteProject = async (req, res) => {
    try {
      const projectId = req.params.projectId; 
      const Role = req.user.role;
      const deletedById = req.user.id;
      const projectName = await ProjectDetails.findById(projectId);
      if(!Role === "SuperAdmin"){
        res.status(401).json({msg : "Only Authorized Person Can Remove the Project"});
      }
      const project = await ProjectDetails.findById(projectId);
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }
       
      await ProjectDetails.findByIdAndDelete(projectId);

  //log 

      try {
        await log.create({
            action: "Deleted",
            entityType: "Project",
            entityId: projectId,
            user: deletedById,
            path : projectName,
            details: ` Project Deleted : ${projectName}`

        })
    }
    catch (err) {
        console.log(err);
    }
  
      return res.status(200).json({ msg: 'Project deleted successfully' });

  
    } catch (err) {
      console.error("Error deleting project:", err);
      return res.status(500).json({ msg: 'Failed to delete project' });
    }
  };

  const getImage =async(req,res)=>{

    try {
      const filePath = path.join(__dirname, '../uploads/images', req.params.pic);
      res.sendFile(filePath);
    } catch (err) {
      console.log("Error: " + err);
    }

  }
  

module.exports = { createProject, updateProject, getProject,deleteProject,getImage};