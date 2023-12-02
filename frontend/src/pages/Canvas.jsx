import React from "react";
import { CanvasContextProvider } from "../context/CanvasContext";
import CanvasTest from "../components/Canvas/test";
import Canvas from "../components/Canvas/Canvas";
import Menubar from "../components/Canvas/Menubar";
import Toolbar from "../components/Canvas/Toolbar";
import "../styles/Canvas.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Typography } from "@mui/material";
// import {
//   nodes as initialNodes,
//   edges as initialEdges,
// } from "../components/Canvas/data.jsx";
import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
const config = {
  projectName: "DB2",
  version: "2.3.5",
  user:{
    name:"John Doe",
    email:"John.doe@students.iiit.ac.in",
  }
};

export default function CanvasPage() {
  // const [nodes, setNodes] = React.useState(initialNodes);
  // const [edges, setEdges] = React.useState(initialEdges);
  const [preview, setPreview] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({ type: "", data: "" });
  const [count, setCount] = React.useState(4);

 

 
  const exportJSON = () => {
    let data = JSON.parse(localStorage.getItem("null-db1-data"));
    let expData = {};
    let nodes = data.nodes;
    let edges = data.edges;
    let constraints = data.constraints;
    let tbCnt = nodes.filter((x) => x.id.split("_").length === 1);
    let tables = [];
    tbCnt.forEach((x) => {
      let childs = nodes.filter(
        (xx) => (xx.id.split("_").length === 2 && xx.id.split("_")[0]) === x.id
      );
      let tb = {};
      tb.link_to_file = x.data.link_to_file;
      tb.table_name = x.data.tableName;
      let at = [];
      childs.forEach((xx) => {
        at.push(xx.data);
      });
      tb.attributes = at;
      tb.attribute_count = at.length;
      tb.constraints = constraints[x.id]||{};
      tables.push(tb);
    });
    let relations = [];
    edges.forEach((x) => {
      let tmp = {};
      tmp.table_1 = x.tb1;
      tmp.table_2 = x.tb2;
      tmp.table_1_fkey = x.fk1;
      tmp.table_2_fkey = x.fk2;
      tmp.type = x.RType;
      relations.push(tmp);
    });
    expData.database_name = config.dbName;
    expData.table_num = tbCnt.length;
    expData.tables = tables;
    expData.relations = relations;
    expData.rawData=data;
    console.log(expData);
    return expData;
  };

  return (
    // <CanvasContextProvider>
    <div class="shell" >
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        scroll="paper"
      >
        <DialogTitle>{modalData.title}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            {modalData.type === "preview" ? (
              <>
                <div
                  style={{
                    width: "500px",
                    overflowY: "hidden",
                    padding: "5px",
                  }}
                >
                  <Typography>Nodes</Typography>
                  <div
                    style={{
                      height: "100%",
                      background: "#242424",
                      color: "white",
                    }}
                  >
                    <pre>{JSON.stringify(modalData.data.nodes, null, 2)}</pre>
                  </div>
                  <Divider />
                  <Typography>Relationships</Typography>
                  <div
                    style={{
                      height: "100%",
                      background: "#242424",
                      color: "white",
                    }}
                  >
                    <pre>{JSON.stringify(modalData.data.edges, null, 2)}</pre>
                  </div>
                  <Divider />
                  <Typography>Constraints</Typography>
                  <div
                    style={{
                      height: "100%",
                      background: "#242424",
                      color: "white",
                    }}
                  >
                    <pre>{JSON.stringify(modalData.data.constraints, null, 2)}</pre>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div class="menubar">
        <Menubar
          // addNode={addNode}
          config={config}
          setCount={setCount}
          preview={preview}
          setPreview={setPreview}
          open={open}
          setModalData={setModalData}
          exportJSON={exportJSON}
        />
      </div>
      <div class="bottom">
        {/* <div class="toolbar">
          <Toolbar />
        </div> */}
        <div class="canvas">
          <Canvas
            count={count}
          setCount={setCount}
          exportJSON={exportJSON}

            // nodes={nodes}
            // setNodes={setNodes}
            // edges={edges}
            // setEdges={setEdges}
            preview={preview}
            setOpen={setOpen}
            setModalData={setModalData}
          />
        </div>
      </div>
    </div>
    // </CanvasContextProvider>
  );
}
