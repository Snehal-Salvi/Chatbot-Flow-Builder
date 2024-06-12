import React from "react";
import "./NodesPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

// Node descriptions and icons
const nodeDescriptors = {
  textMessage: {
    icon: faMessage, // Icon for Message node
    label: "Message", // Label for Message node
  },
  // Future node types can be added here with their icons and labels
};

// NodesPanel component
const NodesPanel = ({ nodeTypes }) => {
  // Function to handle the drag start event
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane.</div>
      {/* Iterate over the node types */}
      {Object.keys(nodeTypes).map((type) => (
        <div
          key={type}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, type)} // Attach the drag start event handler
          draggable
        >
          <FontAwesomeIcon
            icon={nodeDescriptors[type].icon}
            className="node-icon"
          />
          <h3>{nodeDescriptors[type].label}</h3>
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;
