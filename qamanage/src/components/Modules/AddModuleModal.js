// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddModuleModal.css';

// const AddModuleModal = ({ projectId, onClose, onModuleAdded }) => {
//   const [moduleData, setModuleData] = useState({
//     name: '',
//     submoduleName: '',
//   });
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("pro"+projectId);
//       // await axios.post(`http://localhost:5000/api/projects/${projectId}/modules`, moduleData);
//       onModuleAdded();
//       onClose();
//     } catch (error) {
//       console.error('Error adding module:', error);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Module</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Modulnnnnnne Name</label>
//             <input
//               type="text"
//               value={moduleData.name}
//               onChange={(e) => setModuleData({ ...moduleData, name: e.target.value })}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Submodule Name</label>
//             <input
//               type="text"
//               value={moduleData.submoduleName}
//               onChange={(e) => setModuleData({ ...moduleData, submoduleName: e.target.value })}
//               required
//             />
//           </div>
//           <div className="modal-actions">
//             <button type="button" onClick={onClose}>Cancel</button>
//             <button type="submit">Add Module</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddModuleModal; 