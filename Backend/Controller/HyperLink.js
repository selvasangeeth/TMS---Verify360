
const HyperLinkModel = require('../Model/HyperLink.model');
const log = require("../Model/Log.model");


// Create HyperLink
const createHyperLink = async (req, res) => {
    const { title, url } = req.body;
    const userId = req.user.id;

    try {
        if (!title || !url) {
            return res.status(400).json({ msg: 'Title and URL are required' });
        }

        const hyplnk = await HyperLinkModel.findOne({ title });
        if (hyplnk) {
            return res.json({ msg: "Name already exists" });
        }
        else {
            const creat =  await HyperLinkModel.create({
                title,
                url,
                AddedById: userId,
            });

            try {
                await log.create({
                    action: "Created",
                    entityType: "HyperLink",
                    entityId: creat._id,
                    user: userId,
                    timestamp: Date.now(),
                    path: "/HyperLink",
                    details: `Created HyperLink : ${title}`,

                })
                console.log("HyperLink Log addded Successfully");
            }
            catch (err) {
                console.log(err);

            }

            res.status(201).json({ msg: 'Hyperlink created successfully', data: creat });
        }
    } catch (err) {
        console.error('Error creating hyperlink:', err);
        res.status(500).json({ msg: 'Failed to create hyperlink' });
    }
};


//DeleteHyperLink 


const deleteHyperLink = async (req, res) => {
    const { id } = req.params;  
    const userId = req.user.id;  

    try {
       
        const hyperLinkToDelete = await HyperLinkModel.findById(id);
        if (!hyperLinkToDelete) {
            return res.status(404).json({ msg: 'Hyperlink not found' });
        }

       
        await HyperLinkModel.findByIdAndDelete(id);

        try {
            await log.create({
                action: "Deleted",
                entityType: "HyperLink",
                entityId: id,
                user: userId,
                timestamp: Date.now(),
                path: "/HyperLink",
                details: `Deleted HyperLink: ${hyperLinkToDelete.title}`,
            });
            console.log("HyperLink Log added for deletion");
        } catch (err) {
            console.log("Error logging HyperLink deletion:", err);
        }

      
        res.status(200).json({ msg: 'Hyperlink deleted successfully' });
    } catch (err) {
        console.error('Error deleting hyperlink:', err);
        res.status(500).json({ msg: 'Failed to delete hyperlink' });
    }
};

//getHyperLink

const getHyperLink = async (req, res) => {
  try {

    const hyperlinks = await HyperLinkModel.find();

    if (!hyperlinks || hyperlinks.length === 0) {
      return res.status(404).json({ msg: 'No hyperlinks found' });
    }

    res.status(200).json({ msg: 'All Hyperlinks fetched successfully', data: hyperlinks });

  } catch (err) {
    console.error('Error fetching hyperlinks:', err);
    res.status(500).json({ msg: 'Failed to fetch hyperlinks' });
  }
};

//updateHyperLink

const updateHyperLink = async (req, res) => {
    const { id } = req.params;  
    const { title, url } = req.body;  
    const userId = req.user.id;  
  
    try {
     
      if (!title && !url) {
        return res.status(400).json({ msg: 'At least one field (title or url) is required to update' });
      }
  
      const hyperlink = await HyperLinkModel.findById(id);
      if (!hyperlink) {
        return res.status(404).json({ msg: 'Hyperlink not found' });
      }
  
      if (title) {
        hyperlink.title = title;
      }
      if (url) {

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(url)) {
          return res.status(400).json({ msg: 'Please provide a valid URL' });
        }
        hyperlink.url = url;
      }
  
      const updatedHyperlink = await hyperlink.save();

      try {
        await log.create({
            action: "Updated",
            entityType: "HyperLink",
            entityId: id,
            user: userId,
            timestamp: Date.now(),
            path: "/HyperLink",
            details: `Updated HyperLink: ${hyperlink.title}`,
        });
        console.log("HyperLink Log added for deletion");
    } catch (err) {
        console.log("Error logging HyperLink deletion:", err);
    }
  
      res.status(200).json({
        msg: 'Hyperlink updated successfully',
        data: updatedHyperlink,
      });
    } catch (err) {
      console.error('Error updating hyperlink:', err);
      res.status(500).json({ msg: 'Failed to update hyperlink' });
    }
};

module.exports = { createHyperLink,deleteHyperLink,getHyperLink,updateHyperLink };
