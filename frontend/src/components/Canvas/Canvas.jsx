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
import ParentNode from "./parentNodes.jsx";
import CustomNodeEdit from "./customNodesEdit.jsx";
import CustomEdge from "./customEdges.jsx";
// import CustomNodeView from './customNodesView.js';
import "reactflow/dist/style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Select } from "@mui/material";
import { nodes as initialNodes, edges as initialEdges } from "./data.jsx";
import {
  Typography,
  FormControl,
  InputLabel,
  Chip,
  Box,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import CanvasPreview from "./canvasPreview.jsx";
import useUndo from "use-undo";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import CodeIcon from "@mui/icons-material/Code";

function generateJsonStructure(filenames, headers, foreign_keys, primary_keys) {
  console.log("headers in generate JSON: ", headers);
  console.log("file_names in generate JSON: ", filenames);
  console.log("foreign_keys in generate JSON: ", foreign_keys);
  const determineType = (header) => {
    const lowerHeader = header.toLowerCase();
    if (lowerHeader === 'name' || lowerHeader === 'phno') {
      return 'string';
    } else if (lowerHeader === '_id') {
      return 'Obj';
    } else {
      return 'num';
    }
  };

  const tables = filenames.map((filename, index) => {
    return {
      link_to_file: "/",
      table_name: filename.split('.')[0],
      attributes: headers[index].map(name => ({ name, type: determineType(name) })),
      attribute_count: headers[index].length,
      constraints: {}
    };
  });

  const nodes = tables.flatMap((table, i) => {
    const parent = {
      id: `${i + 1}`,
      type: "parent",
      position: { x: 10, y: 10 + i * 300 },
      data: {
        tableName: table.table_name,
        link_to_file: "/",
        attribute_count: table.attribute_count
      },
      style: {
        width: 244,
        height: 90 + 70 * table.attribute_count
      }
    };
    const children = table.attributes.map((attr, j) => {
      return {
        id: `${i + 1}_${j}`,
        type: "child",
        position: { x: 10, y: 50 + j * 70 },
        data: attr,
        parentNode: `${i + 1}`,
        extent: "parent",
        draggable: false,
        style: { width: 224 }
      };
    });
    return [parent, ...children];
  });

  const finalStructure = {
    table_num: filenames.length,
    tables,
    relations: [],
    rawData: {
      nodes,
      edges: [],
      constraints: {},
      primary_key : [],
      foreign_key : []
    }
  };
  // console.log("headers in generate JSON: ", headers);
  // console.log("file_names in generate JSON: ", filenames);
  // console.log("111")

  return JSON.stringify(finalStructure, null, 4);
}

// Example usage:
const filenames = ['employee.csv', 'employee_phone.csv'];
const headers = [
  ['_id', 'Name', 'val'],
  ['_id', 'phno']
];

// const jsonOutput = generateJsonStructure(filenames, headers);
// console.log(jsonOutput);


function inferDataType(header) {
  // A simple and not exhaustive inference function for the data type
  if (header.toLowerCase().includes('id')) return 'Obj';
  if (header.toLowerCase().includes('name')) return 'string';
  if (header.toLowerCase().includes('val')) return 'num';
  return 'string'; // Default type
}
// const CanvasPreview = React.lazy(() => import("./canvasPreview.jsx"));

const constraintsBox = [
  {
    id: "0",
    label: "Not Null",
    field: "not_null",
    type: "array",
  },
  {
    id: "1",
    label: "Unique",
    field: "unique",
    type: "array",
  },
  {
    id: "2",
    label: "Primary Key",
    field: "primary_key",
    type: "array",
  },
  {
    id: "3",
    label: "Foreign Key",
    field: "foreign_key",
    type: "array",
  },
];

// const nnOptions = [
//   "NULL",
//   "Not NULL",
//   // Add your specific options here for "Not Null"
// ];

const nnOptions = [
  { value: "NULL", label: "NULL" },
  { value: "NOT_NULL", label: "Not NULL" },
  // Add more options with value and label properties as needed 
];

const unqOptions = [
  "Unique",
  "Not Unique",
];

const types = [
  {
    value: "1:1",
    label: "one to one",
  },
  {
    value: "1:n",
    label: "one to many",
  },
  {
    value: "n:1",
    label: "many to one",
  },
  {
    value: "m:n",
    label: "many to many",
  },
];

const attributes = ["attribute1", "attribute2", "attribute3", "attribute4"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const checkArray = (data, id, name) => {
  if (data[id.toString()] && data[id.toString()][name])
    return data[id.toString()][name];
  if (data[parseInt(id)] && data[parseInt(id)][name])
    return data[parseInt(id)][name];
  return [];
};

function MultipleSelectChip({
  tableId,
  tableData,
  constraints,
  setConstraints,
}) {
  const [nn, setNn] = useState(checkArray(constraints, tableId, "not_null"));
  const [unq, setUnq] = useState(checkArray(constraints, tableId, "unique"));
  const [pk, setPk] = useState(checkArray(constraints, tableId, "primary_key"));
  const [fk, setFk] = useState(checkArray(constraints, tableId, "foreign_key"));

  useEffect(() => {
    let cons = {};
    cons["not_null"] = nn;
    cons["unique"] = unq;
    cons["primary_key"] = pk;
    cons["foreign_key"] = fk;

    if (constraints[tableId.toString()] === undefined) {
      setConstraints((prev) => ({ ...prev, [tableId.toString()]: cons }));
    } else {
      setConstraints((prev) => ({ ...prev, [tableId.toString()]: cons }));
    }
  }, [nn, unq, pk, fk]);

  const handleChangeConstraint = (event, name) => {
    name === "not_null"
      ? setNn(event.target.value)
      : name === "unique"
        ? setUnq(event.target.value)
        : name === "primary_key"
          ? setPk(event.target.value)
          : setFk(event.target.value);
  };

  return (
    <div>
      {constraintsBox.map((obj) => {
        return (
          <div>
            <FormControl sx={{ m: 1, width: 260 }} size="small" >
              <InputLabel id="demo-multiple-chip-label">{obj.label}</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={
                  obj.field === "not_null"
                    ? nn
                    : obj.field === "unique"
                      ? unq
                      : obj.field === "primary_key"
                        ? pk
                        : fk
                }
                onChange={(e) => handleChangeConstraint(e, obj.field)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,

                    }}

                  >
                    {selected.map((value) => (
                      <Chip key={value} label={value.name} className="chip-outline-black" />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >

                {obj.field === "not_null" && nnOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}

                {obj.field === "unique" && unqOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}

                {(obj.field === "primary_key" || obj.field === "foreign_key") && (
                  tableData.attributes.map((name) => (
                    <MenuItem key={name.id} value={name}>
                      {name.name}
                    </MenuItem>
                  ))
                )}

              </Select>
            </FormControl>
          </div>
        );
      })}
    </div>
  );
}

export default function Canvas({
  count,
  setCount,
  preview,
  setOpen,
  setModalData,
  exportJSON,
}) {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);
  const [pkeys, setPkeys] = React.useState({});
  const [fkeys, setFkeys] = React.useState({});


  useEffect(() => {
    console.log('Updated Edges:', edges);
  }, [edges]);
  useEffect(() => {
    console.log('Updated Nodes:', nodes);
  }, [nodes]);
  useEffect(() => {
    console.log("Updated Pkeys:", pkeys);
  }, [pkeys]);
  useEffect(() => {
    console.log("Updated Fkeys:", fkeys);
  }, [fkeys]);

  const [constraints, setConstraints] = React.useState({});
  const [eOpen, setEOpen] = useState(false);
  const [eName, setEName] = useState("");
  const [eType, setEType] = useState("1:1");
  const [eData, setEData] = useState({});
  const [tableId, setTableId] = React.useState("");
  const [nn, setNn] = useState([]); // Change: Not Null
  const [unq, setUnq] = useState([]); // Change: Unique
  const [tableData, setTableData] = React.useState([]);
  const [undoArray, setUndoArray] = React.useState([]);
  const [redoArray, setRedoArray] = React.useState([]);
  const [
    local,
    {
      set: setLocal,
      reset: resetCount,
      undo: undoCount,
      redo: redoCount,
      canUndo,
      canRedo,
    },
  ] = useUndo({});
  const { present: localStore } = local;
  const onImport = () => { };
  const file_names = [];
  const headers = [];
  // const foreign_keys = [];
  // const primary_keys = [];

  function processFile(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      if (file.type === "text/csv") {
        fileReader.readAsText(file);

        const file_name = file.name;
        file_names.push(file_name);
        const columnUniqueValues = {};
        fileReader.onload = (e) => {
          let csvData = e.target.result;
          const rows = csvData.split('\n');
          const header = rows[0].split(',').map(column => column.trim());;
          headers.push(header);
          console.log("header for the file: ", header);
          // all_headers.push(header);
          console.log("file name for the file", file_name);
          // all_file_names.push(file_name);

          header.forEach(column => {
            columnUniqueValues[column] = new Set();
          });

          // Iterate through rows and update unique values for each column
          rows.slice(1).forEach(row => {
            const values = row.split(',');
            header.forEach((column, index) => {
              columnUniqueValues[column].add(values[index]);
            });
          });

          // Print columns with unique values
          Object.keys(columnUniqueValues).forEach(column => {
            const uniqueValues = Array.from(columnUniqueValues[column]);
            if (uniqueValues.length === rows.length - 1) {
              console.log(`Column ${column} can be a primary key for table ${file_name}`);
            }
          });

          resolve(); // Resolve the promise when processing is complete
        };

        fileReader.onerror = (e) => {
          reject("Error reading the file");
        };
      } else {
        reject("File format of the selected file is not CSV");
      }
    });
  }

  const fileProcessingPromises = [];

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    if (target.files.length > 1) {
      console.log("Number of files selected: ", target.files.length);
    }
    else if (target.files.length === 1) {
      console.log("1 file selected")
    }
    // const name = target.accept.includes("image") ? "images" : "videos";

    // fileReader.readAsDataURL(target.files[0]);
    // fileReader.onload = (e) => {
    //   let dataURI = e.target.result;
    //   const json = atob(dataURI.substring(29));
    //   const result = JSON.parse(json);
    //   setNodes(result.rawData.nodes);
    //   setEdges(result.rawData.edges);
    //   setConstraints(result.rawData.constraints);
    // };
    for (let i = 0; i < target.files.length; i++) {
      fileProcessingPromises.push(processFile(target.files[i]));
    }

    Promise.all(fileProcessingPromises)
      .then(() => {
        // This code will run after all files have been processed
        for (let i = 0; i < file_names.length - 1; i++) {
          for (let j = i + 1; j < file_names.length; j++) {
            console.log('headers[i]', headers[i]);
            const commonHeaders = headers[i].filter(header => headers[j].includes(header));

            if (commonHeaders.length > 0) {
              console.log(`Common headers between ${file_names[i]} and ${file_names[j]}:`, commonHeaders);
              console.log(`Tables: ${file_names[i]}, ${file_names[j]}`);
              console.log("table1: ", file_names[i]);
              console.log("table2: ", file_names[j]);
              console.log("table_1_fkey: ", commonHeaders);
              console.log("table_2_fkey: ", commonHeaders);
              // Add this entry into foreign_keys array as table1:file_names[i], table2:file_names[j], table_1_fkey:commonHeaders, table_2_fkey:commonHeaders
              foreign_keys.push({
                table1: file_names[i],
                table2: file_names[j],
                table_1_fkey: commonHeaders,
                table_2_fkey: commonHeaders
              });

            } else {
              console.log(`No common headers between ${file_names[i]} and ${file_names[j]}.`);
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const files = Array.from(target.files);
    let fileIndex = 0;
    let allHeaders = [];
    let allFileNames = [];

    const generateJsonStructure = (filenames, headers) => {
      console.log("headers in generate JSON new: ", headers);
      console.log("file_names in generate JSON new: ", filenames);

      const primary_keys = [];
      const foreign_keys = [];
      console.log("foreign_keys in generate JSON new: ", foreign_keys);
      console.log("primary keys in generate JSON new: ", primary_keys);
      for (let i = 0; i < file_names.length - 1; i++) {
          for (let j = i + 1; j < file_names.length; j++) {
            console.log('headers[i]', headers[i]);
            const commonHeaders = headers[i].filter(header => headers[j].includes(header));

            if (commonHeaders.length > 0) {
              // console.log(`Common headers between ${file_names[i]} and ${file_names[j]}:`, commonHeaders);
              // console.log(`Tables: ${file_names[i]}, ${file_names[j]}`);
              // console.log("table1: ", file_names[i]);
              // console.log("table2: ", file_names[j]);
              // console.log("table_1_fkey: ", commonHeaders);
              // console.log("table_2_fkey: ", commonHeaders);
              console.log("Making foreign keys!")
              // Add this entry into foreign_keys array as table1:file_names[i], table2:file_names[j], table_1_fkey:commonHeaders, table_2_fkey:commonHeaders
              foreign_keys.push({
                table1: file_names[i],
                table2: file_names[j],
                table_1_fkey: commonHeaders,
                table_2_fkey: commonHeaders
              });

            } else {
              console.log(`No common headers between ${file_names[i]} and ${file_names[j]}.`);
            }
          }
        }

        for (let i = 0; i < file_names.length; i++) {
          const table_name = file_names[i];
          const table_headers = headers[i];
          const table_primary_keys = [];

          for (let j = 0; j < table_headers.length; j++) {
            const column_name = table_headers[j];
            const column_values = headers.map(h => h[j]);

            // Check if all values in the column are unique
            if (new Set(column_values).size === column_values.length) {
              table_primary_keys.push(column_name);
            }
          }

          // Store the primary keys for the current table
          primary_keys.push({
            table_name,
            keys: table_primary_keys
          });
        }



        console.log('foreign keys later: ', foreign_keys);
        console.log('primary keys later: ', primary_keys);

      const determineType = (header) => {
        const lowerHeader = header.toLowerCase();
        if (lowerHeader === 'name' || lowerHeader === 'phno') {
          return 'string';
        } else if (lowerHeader === '_id') {
          return 'Obj';
        } else {
          return 'num';
        }
      };

      const tables = filenames.map((filename, index) => {
        return {
          link_to_file: "/",
          table_name: filename.split('.')[0],
          attributes: headers[index].map(name => ({ name, type: determineType(name) })),
          attribute_count: headers[index].length,
          constraints: {}
        };
      });

      const nodes = tables.flatMap((table, i) => {
        const parent = {
          id: `${i + 1}`,
          type: "parent",
          position: { x: 10, y: 5 + i * 300 },
          data: {
            tableName: table.table_name,
            link_to_file: "/",
            attribute_count: table.attribute_count
          },
          style: {
            width: 244,
            height: 90 + 70 * table.attribute_count
          }
        };
        const children = table.attributes.map((attr, j) => {
          return {
            id: `${i + 1}_${j}`,
            type: "child",
            position: { x: 10, y: 50 + j * 70 },
            data: attr,
            parentNode: `${i + 1}`,
            extent: "parent",
            draggable: false,
            style: { width: 224 }
          };
        });
        return [parent, ...children];
      });
      
      // it should be of the format table1, table2 , table1_fk, table2_fk. Use file_names and headers

      
      console.log("type of tables: ", typeof tables);
      console.log("type of foreign_keys: ", typeof foreign_keys);
      console.log("type of primary_keys: ", typeof primary_keys);
      console.log("tables: ", tables);
      console.log("foreign_keys: ", foreign_keys);
      console.log("primary_keys: ", primary_keys);

      const finalStructure = {
        table_num: filenames.length,
        tables,
        relations: [],
        primary_keys: primary_keys, // Include primary_keys here
        foreign_keys: foreign_keys, // Include foreign_keys here

        rawData: {
          nodes,
          edges: [],
          constraints: {},
          primary_keys: primary_keys, // Include primary_keys here
          foreign_keys: foreign_keys, // Include foreign_keys here

        }
      };
      console.log("finalStructure: ", finalStructure);

      return finalStructure;
    };

    // Function to process reading each CSV file
    const processFiles = (fileIndex) => {
      if (fileIndex >= files.length) {
        // Once all files are processed, generate the full schema and set the states
        const result = generateJsonStructure(allFileNames, allHeaders);
        // useEffect(() => { console.log('Updated Edges:', edges); }, [edges]);
        // useEffect(() => { console.log('Updated Nodes:', nodes); }, [nodes]);
        // useEffect(() => { console.log('Updated Constraints:', constraints); }, [constraints]);
        setNodes([]);
        setTimeout(() => {
          setNodes(result.rawData.nodes)
        }, 1);
        setEdges([]);
        setTimeout(() => {
          setEdges(result.rawData.edges)
        }, 1);
        setConstraints([]);
        setTimeout(() => {
          setConstraints(result.rawData.constraints)
        }, 1);
        setTimeout(() => {
          setPkeys(result.rawData.primary_keys)
        }, 1);
        setTimeout(() => {
          setFkeys(result.rawData.foreign_keys)
        }, 1);
        
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const text = e.target.result;
        const headers = text.split(/\r\n|\n/)[0].split(','); // Split the first line to get headers
        allHeaders.push(headers); // Store headers for schema generation
        allFileNames.push(files[fileIndex].name); // Store file name for schema generation
        processFiles(fileIndex + 1); // Recursively process the next file
      };
      fileReader.onerror = (e) => {
        console.error('File could not be read!', e.target.error);
      };

      fileReader.readAsText(files[fileIndex]); // Read the file as text
    };

    processFiles(0); // Start processing from the first file
  };

  const handleChangeConstraint = (event, name) => {
    console.log(event.target.value, name, tableId);
    let temp = constraints;
    if (!temp[tableId]) {
      temp[tableId] = {};
    }
    let tmp = temp[tableId];
    if (!tmp[name]) {
      tmp[name] = [];
    }
    tmp[name] = event.target.value;
    setConstraints(temp);
  };

  useEffect(() => {
    setLocal({
      nodes: nodes,
      edges: edges,
      constraints: constraints,
    });
  }, [nodes, edges, constraints]);

  useEffect(() => {
    localStorage.setItem("null-db1-data", JSON.stringify(localStore));
  }, [localStore]);

  // setInterval(() => {
  //   let curr=JSON.parse(localStorage.getItem("null-db1-data"));
  //   if(undoArray.length>0 && JSON.stringify(curr)!==JSON.stringify(undoArray[undoArray.length-1])||undoArray.length===0){
  //     console.log("saving")
  //     setUndoArray((prev) => [...prev, curr]);
  //   }
  // }, 5000);

  const genFile = (data) => {
    console.log("Data exported",data);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };
  const addNode = () => {
    let tmp = {
      id: count.toString(),
      type: "parent",
      position: { x: 200, y: 10 },
      data: {
        tableName: "table " + count.toString(),
        link_to_file: "/",
        attribute_count: 0,
      },
      style: {
        width: 244,
        height: 60,
      },
    };
    console.log(tmp);
    setNodes((eds) => eds.concat(tmp));
    setCount(count + 1);
  };

  const handleAddArtibute = (attribute) => {
    let nodes = JSON.parse(localStorage.getItem("null-db1-data")).nodes || [];
    let allNodes = nodes;
    let parent = nodes.filter((x) => x.id === attribute.parentNode)[0];
    parent.data.attribute_count++;
    parent.style.height += 70;
    allNodes.push(attribute);
    setNodes(allNodes);
  };

  const handleArtibuteChange = (id, data) => {
    console.log(data);
    let allNodes = nodes;
    let node = nodes.filter((x) => x.id === id)[0];
    node.data = data;
    setNodes(allNodes);
    console.log(allNodes);
  };

  const nodeTypes = useMemo(
    () => ({
      child: (props) => (
        <CustomNodeEdit
          handleArtibuteChange={handleArtibuteChange}
          nodes={nodes}
          setNodes={setNodes}
          {...props}
        />
      ),
      parent: (props) => (
        <ParentNode
          handleAddArtibute={handleAddArtibute}
          handleTableDataChange={handleArtibuteChange}
          deleteTable={deleteTable}
          setTableId={setTableId}
          setConstraints={setTableData}
          {...props}
        />
      ),
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      buttonedge: (props) => (
        <CustomEdge
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

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      {/*console.log(connection);*/ }
      let nodes = JSON.parse(localStorage.getItem("null-db1-data")).nodes || [];
      {/*console.log(nodes);*/ }
      let data = {};
      let tb1ID = connection.source.split("_")[0];
      let fk1ID =
        connection.source.split("_")[0] + "_" + connection.source.split("_")[1];
      let tb2ID = connection.target.split("_")[0];
      let fk2ID =
        connection.target.split("_")[0] + "_" + connection.target.split("_")[1];
      data.tb1 = nodes.filter((x) => x.id === tb1ID)[0].data.tableName;
      data.tb2 = nodes.filter((x) => x.id === tb2ID)[0].data.tableName;
      data.fk1 = nodes.filter((x) => x.id === fk1ID)[0].data.name;
      data.fk2 = nodes.filter((x) => x.id === fk2ID)[0].data.name;
      data.source = connection.source;
      data.target = connection.target;
      // data.sourceHandle = connection.sourceHandle;
      // data.targetHandle = connection.targetHandle;
      // data.id = "edge_" + connection.source + "_" + connection.target;
      data.type = "buttonedge";
      data.RType = eType;
      console.log(data);
      setEData(data);
      setEName("edge");
      setEOpen(true);
    },
    [setEdges]
  );

  const deleteTable = (id) => {
    console.log('id', id)
    let newNode = nodes.filter((x) => x.id.split("_")[0] != id.toString());
    let newEdge = edges.filter(
      (x) =>
        x.source.split("_")[0] != id.toString() &&
        x.target.split("_")[0] != id.toString()
    );
    console.log('newNodes', newNode)
    console.log('newEdge', newEdge)
    setNodes(newNode);
    setEdges(newEdge);
  };

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div // Change: Control Panel properties
        style={{
          position: "absolute",
          background: "#2d6a4f", // Change: Background color of the control panel
          padding: "10px",
          margin: "10px",
          maxWidth: "300px", // Change: Width of the control panel
          minWidth: "200px",
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={addNode}
          startIcon={<AddBoxIcon />}
          style={{ backgroundColor: "#40916c" }}
        >
          <span style={{ fontSize: "1em" }}>Add a Node</span>
        </Button>
        <div  // Change: Undo,Save and Redo buttons
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "space-between",
            width: "100%",
            gap: "4px",
            // backgroundColor: "red"
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={undoCount}
            disabled={!canUndo}
            startIcon={<UndoIcon />}

          >
            <span style={{ fontSize: "1em" }}>Undo</span>
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {
              let data = exportJSON({
                nodes: nodes,
                edges: edges,
                constraints: constraints,
                // also add primary keys and foreign keys here
                //console log pkeys and fkeys here
                primary_keys: pkeys,
                foreign_keys: fkeys,
              });
              alert("sending data via api : API Needed");
            }}
            startIcon={<SaveIcon />}
          >
            <span style={{ fontSize: "1em" }}>Save</span>
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={redoCount}
            disabled={!canRedo}
            startIcon={<RedoIcon />}
          >
            <span style={{ fontSize: "1em" }}>Redo</span>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "space-between",
            width: "100%",
            gap: "4px",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {
              setEName("preview");
              setEOpen(true);
            }}
            startIcon={<PreviewIcon />}
          >
            <span style={{ fontSize: "1em" }}>Preview</span>
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {
              let modalData = {
                type: "preview",
                title: "Preview of JSON",
                data: {
                  nodes: nodes,
                  edges: edges,
                  constraints: constraints,
                  // constraints: tableData,
                },
              };
              setModalData(modalData);
              setOpen(true);
            }}
            startIcon={<CodeIcon />}
          >
            <span style={{ fontSize: "1em" }}>View JSON</span>
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "space-between",
            width: "100%",
            gap: "4px",
          }}
        >
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            // onClick={() => {}}
            component="label"
            startIcon={<PublishIcon />}
          >
            Import
            <input type="file" multiple hidden onChange={handleCapture} />
          </Button>
          <Button
            style={{ flex: 1, backgroundColor: "#40916c" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={() => {
              console.log("pkeys in export: ", pkeys);
              console.log("fkeys in export: ", fkeys);
              genFile(
                exportJSON({
                  nodes: nodes,
                  edges: edges,
                  constraints: constraints,
                  primary_keys: pkeys,
                  foreign_keys: fkeys,
                })
              );
            }}
            startIcon={<GetAppIcon />}
          >
            Export
          </Button>
        </div>

        {tableId === "" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              backgroundColor: "4CAF50",
              maxWidth: "300px",
            }}
          >
            <div
              style={{
                padding: "5px",
                backgroundColor: "#40916c",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Select a table and click on <strong>Add Constraints</strong> to
              add constraints for that table.
            </div>
          </div>
        ) : (
          <div
            onDoubleClick={() => {
              setTableId("");
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              backgroundColor: "#40916c",
              maxWidth: "280px",
            }}
          >
            <Typography style={{
              padding: "5px",
              backgroundColor: "#40916c",
              borderRadius: "5px",
              textAlign: "center",
            }}>
              CONSTRAINTS for <strong>{tableData.table.name}</strong>
            </Typography>
            <div
              style={{
                width: "100%",
                marginBottom: "5px",
                maxWidth: "250px",

              }}
            >
              <MultipleSelectChip
                key={tableId}
                tableId={tableId}
                tableData={tableData}
                constraints={constraints}
                setConstraints={setConstraints}

              />
            </div>
          </div>
        )}
      </div>
      <Dialog
        open={eOpen}
        onClose={() => {
          setEName("");
          setEOpen(false);
        }}
        scroll="paper"
      >
        <DialogTitle>
          {eName === "edge"
            ? "Relation"
            : eName === "preview"
              ? "Preview"
              : "NONE"}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            {eName === "edge" ? (
              <div
                style={{
                  width: "500px",
                }}
              >
                {/* <TextField label="Name" fullWidth defaultValue={" "} />
              <br />
              <br /> */}
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  value={eType}
                  fullWidth
                  required
                  onChange={(e) => {
                    console.log('New value:', e.target.value);
                    setEType(e.target.value);
                  }}
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <br />
                <TextField
                  label="Table 1 Foreign Key"
                  // disabled
                  defaultValue={eData.fk1}
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  label="Table 2 Foreign Key"
                  // disabled
                  defaultValue={eData.fk2}
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  label="Table 1"
                  // disabled
                  defaultValue={eData.tb1}
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  label="Table 2"
                  // disabled
                  defaultValue={eData.tb2}
                  fullWidth
                />
              </div>
            ) : eName === "preview" ? (
              <div
                style={{
                  width: "800px",
                  height: "500px",
                }}
              >
                <CanvasPreview
                  initialNodes={nodes}
                  initialEdges={edges}
                  initialConstraints={constraints}
                />
              </div>
            ) : (
              <div></div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {eName === "edge" ? (
            <>
              <Button
                onClick={() => {
                  setEdges((eds) => [...eds, eData]);
                  setEName("");

                  setEOpen(false);
                }}
              >
                Done
              </Button>
              <Button
                onClick={() => {
                  setEType("1:1");
                  setEData({});
                  setEName("");

                  setEOpen(false);
                }}
              >
                Cancel
              </Button>
            </>
          ) : eName === "preview" ? (
            <>
              <Button
                onClick={() => {
                  setEName("");
                  setEOpen(false);
                }}
              >
                Close
              </Button>
            </>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        style={{ backgroundColor: "#E0E9EC" }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
