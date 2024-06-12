import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./EditPanel.css";

// EditPanel component definition
const EditPanel = ({ node, onLabelChange, onBack }) => {
  // Initialize state to hold the new label value, starting with the node's current label
  const [newLabel, setNewLabel] = useState(node.data.label);

  // useEffect hook to update the label in real-time as it changes
  useEffect(() => {
    onLabelChange(newLabel); // Call the provided onLabelChange function with the new label value
  }, [newLabel, onLabelChange]); // Dependency array ensures this runs only when newLabel or onLabelChange changes

  return (
    <div className="edit-panel">
      {" "}
      {/* Main container for the edit panel */}
      <div className="edit-panel-header">
        {" "}
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-icon"
          onClick={onBack} // Trigger onBack function when the back icon is clicked
        />
        <h3>Messages</h3>
      </div>
      <hr />
      <div className="form-group">
        {" "}
        <label htmlFor="label">Text</label>
        <textarea
          id="label"
          value={newLabel} // Bind textarea value to the newLabel state
          onChange={(e) => setNewLabel(e.target.value)} // Update newLabel state on text change
          rows={5}
        />
      </div>
    </div>
  );
};

export default EditPanel;
