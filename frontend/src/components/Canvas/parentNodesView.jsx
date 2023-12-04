import React, { memo } from "react";
import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  NodeToolbar,
} from "reactflow";
import TextField from "@mui/material/TextField";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { Typography } from "@mui/material";

const options = [
  {
    value: "smoothstep",
    label: "Smoothstep",
  },
  {
    value: "step",
    label: "Step",
  },
  {
    value: "default",
    label: "Bezier (default)",
  },
  {
    value: "straight",
    label: "Straight",
  },
];

const datatypes = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "num",
    label: "Number",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "datetime",
    label: "Date Time",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function ParentNodeView({
  id,
  data,
}) {

  return (
    <>
      <div
        style={{
          border: "10px solid black",
          height: "100%",
          width: "100%",
            borderRadius: "10px",
        }}
      >
        <div className="custom-node__header">
          <div style={{
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }} variant="body">{data.tableName}</div>
        </div>
        {/* <hr style={{ height: "1px", margin: 0, padding: 0 }} /> */}
      </div>
    </>
  );
}

export default memo(ParentNodeView);
