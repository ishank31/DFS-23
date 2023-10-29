import React from "react";

export default function Home(){
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Instructions to Follow</h2>
      <ul>
        <li>create branch for each featue teamName/featrueName</li>
        <li>create pr to master and then merge</li>
        <li>use lazy loading for import components</li>
        <li>define page components in ./pages</li>
        <li>define common components in ./components, can create subfolders</li>
        <li>use context api for state management</li>
        <li>define context providers in ./context</li>
        <li>define common styles in ./styles</li>
        <li>use unique name for class in like "page-components-type" "canvas-toolbar-button" instead of just using button</li>

      </ul>
    </div>
  );
};
