import React from "react";
import { Handle, Position } from "reactflow";
import "./CustomNode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// CustomNode component
const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      {" "}
      {/* Container for the custom node */}
      <div className="header">
        {" "}
        {/* Header section of the node */}
        <div className="header-content">
          <FontAwesomeIcon icon={faMessage} className="chat-icon" />
          {data.heading}
        </div>
        <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
      </div>
      <div className="content">
        {" "}
        {/* Content section of the node */}
        <div className="label">{data.label}</div>
      </div>
      <Handle
        type="source" // Source handle for outgoing connections
        position={Position.Right} // Position the handle on the right
        id="source" // Unique ID for the handle
        className="source-handle"
      />
      <Handle
        type="target" // Target handle for incoming connections
        position={Position.Left} // Position the handle on the left
        id="target" // Unique ID for the handle
        className="target-handle"
      />
    </div>
  );
};

export default CustomNode;
