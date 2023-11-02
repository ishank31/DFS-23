# UI for Data Ingestion : Team AttentionIsAllYouNeed
## Description 
This repo only contains code for shell part which enables user can design the structure of there SQL database the can start from fresh and export it or edit a exiting work by importing the exported json file or continue the saved session and visualize it.
## Some Screenshots  
### Canvas : Area for graph
![](https://hackmd.io/_uploads/HJpObZ5E2.png)
![](https://hackmd.io/_uploads/BJ9tV-5N2.png)
### Menubar/Toolbar : we had these two seprated but due to our target to give more space to graph section we combined them
![](https://hackmd.io/_uploads/H12bix9V2.png)
### Preview : to visualize the created graph stucrture 
![](https://hackmd.io/_uploads/B15u4WcV3.png)
### Constraints : we got you cover if you need to add attribute specific contraints 
![](https://hackmd.io/_uploads/rkxo2B3E3.png)
### Visualize Constraints : to represent the constraints for each attribute
![](https://hackmd.io/_uploads/r1nsNbq4h.png)
### View JSON code `for devlopers who like Data :}` : see behind the scene stuff 
![](https://hackmd.io/_uploads/ryXRNZqNn.png)
### Save graph : need api to save this under your proect (to be made by other team)
![](https://hackmd.io/_uploads/BksJSb5V2.png)


## Integration 
### Steps
+ > interating this to your react project is quite simple 
+ install all dependencies mentioned in `/frontend/package.json`
+ the main component you need to add in you portal is in `frontend/src/pages/Canvas.jsx` along with all the files on which it depends (for safe side copy all thing from `frontend/src`
+ > thats it its all done

## Run this for Demo 
+ clone this repo
+ `cd ./forntend`
+ `npm install`
+ `npm run dev`
+ use `localhost:5173`
### {: happy designing :}

> # Creators 
> + Ishan Kavathekar
> + Aaryan Sharma


+ screenshots > https://hackmd.io/XQlaqnf6Rjm9NlSJZVUHhw 
+ task division > https://hackmd.io/o1JVJ44AS0aMf6gdW_q7sg
+ scope(first draft) > https://hackmd.io/_xT6l9mUS3quNvTJJ3POBQ
+ final scope > https://github.com/Architjain128/Null/blob/master/Scope_Doc.md
