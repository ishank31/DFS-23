# Null
## Project Number 39 : UI for Data Ingestion
## Team Members
+ Archit Jain (2019101053)
+ Pulkit Gupta (2019101078)
+ Harshita Upadhyay (2019101126)

## Overview
With the increase in the volume of data, both structured and unstructured, being generated in recent years, data ingestion has become a task of particular importance. This project deals with the task of creating a UI Interface for a generic data ingestion system.

In this project, a javascript-based UI tool is required, to help the users visualize their data in a suitable schema-like format, and allow them to create a relational mapping of what the overall database design should be. This visual schema should then be converted into a pre-determined JSON schema. It will be a graph-like structure containing nodes and edges for entities and relationships between entities in the database and generate a generic JSON schema.

The input data can vary as a user can start from scratch or add a fresh JSON schema or continue with the previously created structure.

## Requirements
The UI section of the project will be based on javascript, in particular, flowJS, which enables us to create a suitable reactJS web application allowing client-side users to easily generate their JSON mock-ups and can make data visualisation and validation better.
- **UI Module:**
This phase of the project is designed to enhance the user’s frontend experience, and make the process of generating the JSON schema for their data more intuitive. Instead of a code-based system which might have a technical overhead, the UI provides a drag-and-drop-based application, which can allow users to better visualize their data, its fields, and any relations among them. 
The UI interface that would be used by the end user to show the database schema would have the following descriptions:

    1. The entire database schema would be built using a node-based graph.
        1. The nodes of the graph would represent the tables
        2. The edges of the graph would represent the relations
    2. **Nodes:**
        1. Each node would have a section to input the *name of the fields* present inside the Table, and what *type of data* they would Field store (Integers, Decimals, Strings etc. which would be easily understood by a non-technical user)
        2. The table will also ask what field of the table would be the *Unique Identifier* for that table.
    3. **Edges:**
        1. The edges would represent the relations that exist between the tables. In the tables, we can ask what are the foreign key constraints (In a manner which is understandable by a non-technical user).
        2. The edges would also ask for what kind of relationship exists between the two tables like *one-to-one, many-to-one,* etc. 

This approach of using a node-based graph allows a much more intuitive UI and UX for the user and could be built using React Library `ReactFlow.js` [Link](https://reactflow.dev/).
- **JSON Schema:**
The first task for the project is conceptualizing an efficient JSON schema, that is able to map enough context from the provided raw data, but with around 30-50% of the description contained in a DB schema. The JSON format here will have to work for most generic data systems, taking into account databases with multiple fields, constraints, varying relationships among fields and tables, and also logging any occasional syntax or field errors.
The schema should contain sufficient metadata in order to provide suitable scope for the loading phase, specifying the number of tables, rows, and overall structure. In addition to this, there should be an abstract representation of tables in JSON format. Abstractions can be made with regard to the data type of a field (this can be learnt while validating), constraints, and relationship mapping.

    Descriptions of the JSON for the file

    | Field | Description | End-Used Inputted |
    | --- | --- | --- |
    | database_name | The name of the database | Yes |
    | table_num | Numbers of tables present in the string | No |
    | enumerations | User-defined enumeration data formats | Yes |
    | sets | User-defined set data formats | Yes |
    | tables | A JSON-Array containing the descriptions of the table | Yes |
    | relations | A JSON-Array containing the descriptions of the relations that exist between the table | Yes |
    
## Requirements Coverage

### Functional Requirements

+ User must be able to add a new JSON schema file and visualize it using the platform.
+ User can also edit the JSON schema visualized on the platform.
+ User can create a new JSON schema from scratch using drag and drop.
+ User can see the JSON schema saved earlier, visualize it and can edit and resave it.

### Non-functional 
+ Scalable and Performance as files of the size of many GBS will be added and maintained in the platform.
+ Usability is easy to use and visualise because of its drag and drop and graph structure.
+ Compatible with other services like backend server, database etc.
+ Security and Reliability provided by Data Foundation Platform 



## Representaion
+ UI DB Design Schema

    ![](https://i.imgur.com/VFiarSr.png)
    
+ UML Diagram

    ![](https://i.imgur.com/FQebpgR.jpg)

+ Use Case Diagram 

    ![](https://i.imgur.com/Cj6JPRi.png)






## Scope of Project
As the project has been divided into 2 teams and our scope of Data Ingestion UI is listed below.

### Frontend
+ **Model Toolbox**- It will enable the user to add nodes and edges from the toolbox using drag and drop functionality to the design canvas.
+ **Design Canvas**- Canvas to create a graph like structure using nodes and edges to represent the different tables, their attributes and the relationship between different tables.
     - **add node**  - Add a functionality to implement a new table as a node into the graph.
    - **attribute properties** - this includes all the attributes of a particular  node.
    - **add edge** - Relation between node attributes.
    - **drag and drop** - a functionality that will add a new node and edge to the graph
    - **connection of attribute** - refers to establishing relationships between attributes in different nodes (tables) in the graph UI. This allows for the creation of edges to represent these relationships and helps to visualize the flow of data.
    - **population of node** - Populating nodes in the graph refers to adding data or information to the nodes, such as adding attributes or properties to a particular column in a table represented by a node.
    - **tags**- to identify primary and foreign keys.
    
+ **Undo and Redo**- a functionality to undo and redo any action done by user.
+ **Menu bar**
    -  **import**- import JSON file and visualize the model as dynamic-graph and can edit it
    -  **export**- export dynamic-graph information generated by the user as a json file
    -  **save**- save the model
    - **preview**- preview the model 

<!-- ## Backend
From given different csv, we will extract the following inferences- 
- **table fields/attributes** 
- **attribute type**  -->
<!-- - **foreign keys**  -->



## Not in the Scope of Project
+ version management 
+ any db and backend to same json (to be done by other team and provide api)
+ full-fledged ER model designing tool

