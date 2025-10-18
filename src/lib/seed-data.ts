import { Project } from '@/types/uml';

export const seedProject: Project = {
  id: 'seed-project',
  name: 'Example UML Project',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  diagrams: [
    {
      id: 'diagram-1',
      name: 'User Authentication System',
      settings: {
        grid: true,
        snap: true,
        theme: 'dark',
      },
      nodes: [
        {
          id: 'user-class',
          type: 'class',
          icon: 'class',
          position: { x: 100, y: 100 },
          size: { w: 240, h: 180 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'User',
            fields: [
              { visibility: '-', name: 'id', type: 'string' },
              { visibility: '-', name: 'email', type: 'string' },
              { visibility: '-', name: 'password', type: 'string' },
              { visibility: '-', name: 'role', type: 'UserRole' },
            ],
            methods: [
              { visibility: '+', name: 'login', params: [], returns: 'boolean' },
              { visibility: '+', name: 'logout', params: [], returns: 'void' },
              { visibility: '+', name: 'validatePassword', params: [], returns: 'boolean' },
            ],
          },
        },
        {
          id: 'auth-interface',
          type: 'interface',
          icon: 'interface',
          position: { x: 450, y: 100 },
          size: { w: 240, h: 120 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'IAuthService',
            methods: [
              { visibility: '+', name: 'authenticate', params: [], returns: 'Promise<User>' },
              { visibility: '+', name: 'authorize', params: [], returns: 'boolean' },
              { visibility: '+', name: 'refreshToken', params: [], returns: 'Promise<string>' },
            ],
          },
        },
        {
          id: 'role-enum',
          type: 'enum',
          icon: 'enum',
          position: { x: 100, y: 350 },
          size: { w: 200, h: 120 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'UserRole',
            values: ['ADMIN', 'USER', 'GUEST'],
          },
        },
        {
          id: 'note-1',
          type: 'note',
          icon: 'note',
          position: { x: 450, y: 320 },
          size: { w: 240, h: 100 },
          connectors: [],
          data: {
            name: 'Note',
            text: 'This diagram demonstrates a simple authentication system with User class implementing IAuthService interface. UserRole enum defines access levels.',
          },
        },
      ],
      edges: [],
    },
    {
      id: 'diagram-2',
      name: 'E-Commerce Domain Model',
      settings: {
        grid: true,
        snap: true,
        theme: 'dark',
      },
      nodes: [
        {
          id: 'order-class',
          type: 'class',
          icon: 'class',
          position: { x: 300, y: 100 },
          size: { w: 240, h: 160 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'Order',
            fields: [
              { visibility: '-', name: 'id', type: 'string' },
              { visibility: '-', name: 'customer', type: 'Customer' },
              { visibility: '-', name: 'items', type: 'OrderItem[]' },
              { visibility: '-', name: 'total', type: 'number' },
            ],
            methods: [
              { visibility: '+', name: 'calculateTotal', params: [], returns: 'number' },
              { visibility: '+', name: 'addItem', params: [], returns: 'void' },
            ],
          },
        },
        {
          id: 'customer-class',
          type: 'class',
          icon: 'class',
          position: { x: 100, y: 300 },
          size: { w: 240, h: 140 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'Customer',
            fields: [
              { visibility: '-', name: 'id', type: 'string' },
              { visibility: '-', name: 'name', type: 'string' },
              { visibility: '-', name: 'orders', type: 'Order[]' },
            ],
            methods: [
              { visibility: '+', name: 'placeOrder', params: [], returns: 'Order' },
            ],
          },
        },
        {
          id: 'item-class',
          type: 'class',
          icon: 'class',
          position: { x: 500, y: 300 },
          size: { w: 240, h: 140 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: {
            name: 'OrderItem',
            fields: [
              { visibility: '-', name: 'product', type: 'Product' },
              { visibility: '-', name: 'quantity', type: 'number' },
              { visibility: '-', name: 'price', type: 'number' },
            ],
            methods: [
              { visibility: '+', name: 'getSubtotal', params: [], returns: 'number' },
            ],
          },
        },
      ],
      edges: [],
    },
  ],
};
