import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./FlowBuilder.css";
import CustomNode from "../Nodes/CustomNode";
import NodesPanel from "../SideBar/NodesPanel";
import EditPanel from "../SideBar/EditPanel";
import SaveButton from "../SaveButton/SaveButton";

// Initial node types
const nodeTypes = {
  textMessage: CustomNode, // Current node type
  // More node types can be added here
};

// Initial nodes to be displayed in the flow
const initialNodes = [
  {
    id: "1",
    type: "textMessage",
    data: { label: "Test Message 1", heading: "Send Message" },
    position: { x: 100, y: 250 },
  },
  // Future nodes can be added here
];

// Utility function to generate unique IDs for new nodes
let id = 1;
const getId = () => `dndnode_${id++}`;

const FlowBuilder = () => {
  // Ref to the ReactFlow wrapper for managing drag and drop positions
  const reactFlowWrapper = useRef(null);

  // States to manage nodes and edges within the flow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); // To manage currently selected node for editing

  // Callback to handle new connections (edges) between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handler for when a node is clicked, setting it as the selected node for editing
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Prevent default behavior to allow custom drag and drop handling
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handler for dropping new nodes into the flow area
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // Get the type of node from the drop event
      const type = event.dataTransfer.getData("application/reactflow");

      // Exit if the drop data does not have a valid type
      if (!type) return;

      // Calculate the position within the flow area where the node was dropped
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node with the determined type and position
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Test Message ${id}`, heading: "Send Message" },
      };

      // Add the new node to the nodes state
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Handler to update the label of the selected node in real-time
  const onLabelChange = useCallback(
    (newLabel) => {
      if (selectedNode) {
        // Update the nodes state with the new label for the selected node
        setNodes((nds) =>
          nds.map((node) =>
            node.id === selectedNode.id
              ? { ...node, data: { ...node.data, label: newLabel } }
              : node
          )
        );
      }
    },
    [selectedNode, setNodes]
  );

  // Function to handle the back action, clearing the selected node
  const handleBack = () => {
    setSelectedNode(null);
  };

  return (
    <div className="flow-builder-container">
      <ReactFlowProvider>
        {/* Save button positioned at the top */}
        <div className="save-button-container">
          <SaveButton nodes={nodes} edges={edges} />
        </div>

        {/* Main content area for flow builder and side panels */}
        <div className="flow-builder-content">
          {/* Flow area where nodes and edges are visualized */}
          <div className="flow-area" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              onNodeClick={onNodeClick}
              style={{ width: "100%", height: "100%" }}
            >
              <Controls />
            </ReactFlow>
          </div>

          {/* Sidebar for node editing or node type selection */}
          <div className="sidebar">
            {selectedNode ? (
              // Show the edit panel if a node is selected
              <EditPanel
                node={selectedNode}
                onLabelChange={onLabelChange}
                onBack={handleBack}
              />
            ) : (
              // Show the nodes panel if no node is selected
              <NodesPanel nodeTypes={nodeTypes} />
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;
