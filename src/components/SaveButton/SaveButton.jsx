import React, { useState } from "react";
import "./SaveButton.css";

// SaveButton component takes nodes and edges as props
const SaveButton = ({ nodes, edges }) => {
  // State to manage the display message (success or error)
  const [message, setMessage] = useState(null);
  // State to manage the type of message: "error" or "success"
  const [messageType, setMessageType] = useState(null);

  // Function to handle the save action
  const handleSave = () => {
    // Create a set of node IDs that have incoming edges (targets)
    const nodesWithIncomingEdges = new Set(edges.map((edge) => edge.target));

    // Filter nodes to find those without any incoming edges
    const nodesWithoutIncomingEdges = nodes.filter(
      (node) => !nodesWithIncomingEdges.has(node.id)
    );

    // Check the count of nodes without incoming edges
    if (nodesWithoutIncomingEdges.length > 1) {
      // If more than one node without incoming edges, set error message
      setMessage("Error: More than one node has empty target handles.");
      setMessageType("error");
    } else {
      // If the condition is satisfied, set success message
      setMessage("Flow saved successfully!");
      setMessageType("success");
    }

    // Clear the message after 2 seconds
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
  };

  return (
    <>
      {/* Container for the message display */}
      <div className="message-container">
        {message && (
          // Conditionally render the message based on its type
          <div className={`message ${messageType}`}>{message}</div>
        )}
      </div>
      {/* Button to trigger the save action */}
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </>
  );
};

export default SaveButton;
