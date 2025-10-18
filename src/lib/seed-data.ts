import { Project } from '@/types/uml';

export const seedProject: Project = {
  id: 'seed-project',
  name: 'Demo UML Project',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  diagrams: [
    {
      id: 'diagram-1',
      name: 'AWS Serverless Workflow',
      settings: {
        grid: true,
        snap: true,
        theme: 'dark',
      },
      nodes: [
        // API Gateway - Entry point
        {
          id: 'api-gateway',
          type: 'aws-api-gateway',
          icon: 'aws-api-gateway',
          position: { x: 100, y: 100 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'API Gateway', text: 'REST API' },
        },
        // Lambda - Auth
        {
          id: 'lambda-auth',
          type: 'aws-lambda',
          icon: 'aws-lambda',
          position: { x: 350, y: 100 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'Auth Lambda', text: 'authenticate' },
        },
        // Cognito
        {
          id: 'cognito',
          type: 'aws-cognito',
          icon: 'aws-cognito',
          position: { x: 350, y: 240 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'Cognito User Pool', text: 'User Management' },
        },
        // Lambda - Business Logic
        {
          id: 'lambda-processor',
          type: 'aws-lambda',
          icon: 'aws-lambda',
          position: { x: 600, y: 100 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'Process Lambda', text: 'processRequest' },
        },
        // DynamoDB
        {
          id: 'dynamodb',
          type: 'aws-dynamodb',
          icon: 'aws-dynamodb',
          position: { x: 850, y: 100 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'DynamoDB', text: 'Main Database' },
        },
        // Lambda - Async Processing
        {
          id: 'lambda-async',
          type: 'aws-lambda',
          icon: 'aws-lambda',
          position: { x: 600, y: 280 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'Async Lambda', text: 'handleEvents' },
        },
        // S3
        {
          id: 's3-storage',
          type: 'aws-s3',
          icon: 'aws-s3',
          position: { x: 850, y: 280 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'S3 Bucket', text: 'File Storage' },
        },
        // Lambda - Notification
        {
          id: 'lambda-notify',
          type: 'aws-lambda',
          icon: 'aws-lambda',
          position: { x: 350, y: 420 },
          size: { w: 180, h: 80 },
          connectors: ['top', 'right', 'bottom', 'left'],
          data: { name: 'Notify Lambda', text: 'sendNotification' },
        },
        // CloudWatch Note
        {
          id: 'note-monitoring',
          type: 'note',
          icon: 'note',
          position: { x: 100, y: 280 },
          size: { w: 200, h: 80 },
          connectors: [],
          data: { name: 'Note', text: 'All Lambda functions send logs to CloudWatch for monitoring and debugging' },
        },
        // Architecture Note
        {
          id: 'note-architecture',
          type: 'note',
          icon: 'note',
          position: { x: 100, y: 420 },
          size: { w: 220, h: 90 },
          connectors: [],
          data: { name: 'Note', text: 'Serverless architecture enables automatic scaling, pay-per-use pricing, and zero server management' },
        },
        // Security Note
        {
          id: 'note-security',
          type: 'note',
          icon: 'note',
          position: { x: 600, y: 420 },
          size: { w: 200, h: 80 },
          connectors: [],
          data: { name: 'Note', text: 'Cognito provides secure authentication with OAuth 2.0 and SAML 2.0 support' },
        },
        // Database Note
        {
          id: 'note-database',
          type: 'note',
          icon: 'note',
          position: { x: 850, y: 420 },
          size: { w: 180, h: 90 },
          connectors: [],
          data: { name: 'Note', text: 'DynamoDB offers single-digit millisecond performance at any scale' },
        },
        // Workflow Idea Pin
        {
          id: 'idea-workflow',
          type: 'idea-pin',
          icon: 'idea-pin',
          position: { x: 100, y: 560 },
          size: { w: 220, h: 60 },
          connectors: [],
          data: { 
            name: 'Idea',
            text: 'Add SQS queue for better decoupling between components' 
          },
        },
        // Performance Idea Pin
        {
          id: 'idea-performance',
          type: 'idea-pin',
          icon: 'idea-pin',
          position: { x: 380, y: 560 },
          size: { w: 200, h: 60 },
          connectors: [],
          data: { 
            name: 'Idea',
            text: 'Implement caching with ElastiCache to reduce latency' 
          },
        },
        // Cost Idea Pin
        {
          id: 'idea-cost',
          type: 'idea-pin',
          icon: 'idea-pin',
          position: { x: 640, y: 560 },
          size: { w: 180, h: 60 },
          connectors: [],
          data: { 
            name: 'Idea',
            text: 'Use Lambda reserved concurrency to control costs' 
          },
        },
      ],
      edges: [],
    },
  ],
};
