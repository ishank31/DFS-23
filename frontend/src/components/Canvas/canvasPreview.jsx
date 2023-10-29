import React, { useCallback, useState, useMemo, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import ParentNodeView from "./parentNodesView.jsx";
import CustomNodeView from "./customNodeView.jsx";
import CustomEdgeView from "./customEdgeView.jsx";
// import CustomNodeView from './customNodesView.js';
import "reactflow/dist/style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Select } from "@mui/material";
import {
  Typography,
  FormControl,
  InputLabel,
  Chip,
  Box,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import EditAttributesOutlinedIcon from "@mui/icons-material/EditAttributesOutlined";



export default function CanvasPreview({
  initialNodes,
  initialEdges,
  initialConstraints,
}) {

    const preprocess = (nodes) => {
        let newNodes=nodes
        newNodes.forEach((node)=>{
            node.connectable=false
            node.draggable=false
            // if(node.type==="parent"){
            //     node.style.height=20+node.data.attribute_count*20
            // }
            // else{
            //     node.position.y=20
            // }

        })
        return newNodes
    }
  const [nodes, setNodes] = React.useState(preprocess(initialNodes));
  const [edges, setEdges] = React.useState(initialEdges);
  const [constraints, setConstraints] = React.useState(initialConstraints);

  const nodeTypes = useMemo(
    () => ({
      child: (props) => <CustomNodeView constraints={constraints} {...props} />,
      parent: (props) => <ParentNodeView {...props} />,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      buttonedge: (props) => (
        <CustomEdgeView
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          {...props}
        />
      ),
    }),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
        //   position: "absolute",
          top: "0px",
          left: "0px",
        }}
      >
        <Chip
          label="Primary Key"
          icon={
            <KeyOutlinedIcon
              style={{
                transform: "rotate(-90deg)",
                color: "gold",
              }}
            />
          }
        />
        <Chip
          label="Forigen Key"
          icon={
            <VpnKeyIcon
              style={{
                transform: "rotate(-90deg)",
                color: "green",
              }}
            />
          }
        />
        <Chip
          label="Not Null"
          icon={
            <EditAttributesOutlinedIcon
              style={{
                color: "blue",
              }}
            />
          }
        />
        <Chip
          label="Unique"
          icon={
            <FlareOutlinedIcon
              style={{
                color: "red",
              }}
            />
          }
        />
      </div>
      <div
        style={{
            height: "100%",
            width: "100%",
            transform: "scale(0.92)"
        }}
      >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap
          style={{
            width: 50,
            height: 50,
            zIndex: 100,
            backgroundColor: "white",
          }}
        />
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
      </div>
    </div>
  );
}
