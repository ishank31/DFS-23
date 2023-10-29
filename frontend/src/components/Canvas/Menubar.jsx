import React from "react";
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import GetAppIcon from "@mui/icons-material/GetApp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PreviewIcon from "@mui/icons-material/Preview";
import CodeIcon from "@mui/icons-material/Code";
import EventSeatSharpIcon from '@mui/icons-material/EventSeatSharp';

export default function Menubar({
  data,
  preview,
  setPreview,
  exportJSON,
  setCount,
  config,
}) {
  const menuButtons = [
    // { label: "New Schema", icon: <FiberNewIcon />, divider: false, function:()=>{} },
    {
      label: "Save Schema",
      icon: <SaveIcon />,
      divider: true,
      function: () => {},
    },
    {
      label: "Preview",
      icon: <PreviewIcon />,
      divider: true,
      function: () => {},
    },

    {
      label: "View JSON",
      icon: <CodeIcon />,
      divider: false,
      function: () => {
        setPreview(!preview);
      },
    },
    {
      label: "Import JSON",
      icon: <PublishIcon />,
      divider: false,
      function: () => {},
    },
    {
      label: "Export JSON",
      icon: <GetAppIcon />,
      divider: true,
      function: () => {
        exportJSON(data);
      },
    },

    {
      label: "Add Node",
      icon: <AddBoxIcon />,
      divider: true,
      function: () => {
        setCount((count) => count + 1);
      },
    },

    { label: "Undo", icon: <UndoIcon />, divider: false, function: () => {} },
    { label: "Redo", icon: <RedoIcon />, divider: true, function: () => {} },
  ];

  return (
    <div class="div-center-vh">
      {/* <div> */}
      <Grid container spacing={2} p={1}>
        <Grid item xs={6}>
          <div style={{
            display: "flex",
            alignItems:"baseline",
          }}>
            <EventSeatSharpIcon
              style={{
                // color: "grey",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "0px",
                marginTop: "0px",
                fontSize: "40px",
                fontWeight: "bold",
                transform: "rotate(180deg) translate(0px,-5px)",
              }}
            />
          <Typography variant="h4">Project: {config.projectName}</Typography>
          <p style={{
            color: "grey",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "0px",
            marginTop: "0px",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "0px",
          }}>|</p>
          <Typography variant="body">{" "}Version {config.version}</Typography>
        </div>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} alignContent="right">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div>
              <Avatar />
            </div>
            <div>
              <Typography variant="h5">{config.user.name}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* </div> */}
      {/* <Grid container spacing={2}>
        {menuButtons.map((button) => {
          return (
            <>
              {" "}
              <Grid item xs={1}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  onClick={button.function}
                >
                  <IconButton>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <div style={{ flex: 2 }}>{button.icon}</div>
                      <div style={{ flex: 1 }}>
                        <Typography
                          varient="caption"
                          style={{ fontSize: "15px" }}
                        >
                          {button.label}
                        </Typography>
                      </div>
                    </div>
                  </IconButton>
                </div>
              </Grid>
              {button.divider && <Divider orientation="vertical" flexItem />}
            </>
          );
        })}
      </Grid> */}
    </div>
  );
}
