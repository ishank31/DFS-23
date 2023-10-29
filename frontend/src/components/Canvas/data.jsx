import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes = [
  {
    id: '1',
    type: 'parent',
    position: { x: 10, y: 10 },
    data: {
      tableName: 'orgId',
      link_to_file: '/',
      attribute_count : 3, 
    },
    style: {
      width: 244,
      height: 270,
    },
  },
  {
    id: '1_0',
    type: 'child',
    position: { x: 10, y: 50 },
    data: {
      name: '_id',
      type: 'Obj',
    },
    parentNode: '1',
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  },
  {
    id: '1_1',
    type: 'child',
    position: { x: 10, y: 120 },
    data: {
      name: 'Name',
      type: 'string',
    },
    draggable: false,
    parentNode: '1',
    extent: 'parent',
    style: {
      width: 224,
    },
  },
  {
    id: '1_2',
    type: 'child',
    position: { x: 10, y: 190 },
    data: {
      name: 'val',
      type: 'num',
    },
    parentNode: '1',
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  },
  {
    id: '2',
    type: 'parent',
    position: { x: 400, y: 10 },
    data: {
      tableName: 'empId',
      link_to_file: '/',
      attribute_count : 2, 
    },
    style: {
      width: 244,
      height: 200,
    },
  },
  {
    id: '2_0',
    type: 'child',
    position: { x: 10, y: 50 },
    data: {
      name: '_id',
      type: 'Obj',
    },
    parentNode: '2',
    extent: 'parent',
    draggable: false,
    style: {
      width: 224,
    },
  },
  {
    id: '2_1',
    type: 'child',
    position: { x: 10, y: 120 },
    data: {
      name: 'Name',
      type: 'string',
    },
    draggable: false,
    parentNode: '2',
    extent: 'parent',
    style: {
      width: 224,
    },
  },

];

export const edges = [
  { id: 'edge-1', source:'1_0', target:'2_0' ,sourceHandle: '1_0_r',  type: 'buttonedge',},
  // { id: 'edge-2', sourceHandle: '1_1_r', targetHandle: '2_2_l'},
];
