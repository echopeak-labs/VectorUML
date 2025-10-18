import { Project } from "@/types/uml";

export const seedProject: Project = {
  id: "seed-project",
  name: "Demo UML Project",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  diagrams: [
    {
      id: "diagram-1",
      name: "AWS Serverless Workflow",
      settings: {
        grid: true,
        snap: true,
        theme: "dark",
      },
      nodes: [
        {
          id: "api-gateway",
          type: "aws-api-gateway",
          icon: "aws-api-gateway",
          position: {
            x: -140.7312722948871,
            y: -97.76456599286564,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "API Gateway",
            text: "REST API",
          },
        },
        {
          id: "lambda-auth",
          type: "aws-lambda",
          icon: "aws-lambda",
          position: {
            x: 365.6618118112506,
            y: -26.118194620238384,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Auth Lambda",
            text: "authenticate",
          },
        },
        {
          id: "cognito",
          type: "aws-cognito",
          icon: "aws-cognito",
          position: {
            x: 682.6136354582486,
            y: -177.6038112523105,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Cognito User Pool",
            text: "User Management",
          },
        },
        {
          id: "lambda-processor",
          type: "aws-lambda",
          icon: "aws-lambda",
          position: {
            x: 895.0378363582294,
            y: 604.5867028614604,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Process Lambda",
            text: "processRequest",
          },
        },
        {
          id: "dynamodb",
          type: "aws-dynamodb",
          icon: "aws-dynamodb",
          position: {
            x: 239.0487514863251,
            y: 554.387633769323,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "DynamoDB",
            text: "Main Database",
          },
        },
        {
          id: "lambda-async",
          type: "aws-lambda",
          icon: "aws-lambda",
          position: {
            x: 284.22413793103397,
            y: 271.75980975029745,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Async Lambda",
            text: "handleEvents",
          },
        },
        {
          id: "s3-storage",
          type: "aws-s3",
          icon: "aws-s3",
          position: {
            x: 494.49464922711036,
            y: 627.2651605231871,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "S3 Bucket",
            text: "File Storage",
          },
        },
        {
          id: "lambda-notify",
          type: "aws-lambda",
          icon: "aws-lambda",
          position: {
            x: 621.9262782401905,
            y: 244.60166468489876,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Notify Lambda",
            text: "sendNotification",
          },
        },
        {
          id: "note-monitoring",
          type: "note",
          icon: "note",
          position: {
            x: -34.19738406658743,
            y: 115.19619500594519,
          },
          size: {
            w: 262,
            h: 152,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Note",
            text: "All Lambda functions send logs to CloudWatch for monitoring and debugging",
          },
        },
        {
          id: "note-architecture",
          type: "note",
          icon: "note",
          position: {
            x: 140.02378121284193,
            y: -277.0318073721769,
          },
          size: {
            w: 240,
            h: 173,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Note",
            text: "Serverless architecture enables automatic scaling, pay-per-use pricing, and zero server management",
          },
        },
        {
          id: "note-security",
          type: "note",
          icon: "note",
          position: {
            x: 833.0796670630206,
            y: -348.8391795481579,
          },
          size: {
            w: 276,
            h: 151,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Note",
            text: "Cognito provides secure authentication with OAuth 2.0 and SAML 2.0 support",
          },
        },
        {
          id: "note-database",
          type: "note",
          icon: "note",
          position: {
            x: -60.54102259215353,
            y: 670.7372175980979,
          },
          size: {
            w: 283,
            h: 139,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Note",
            text: "DynamoDB offers single-digit millisecond performance at any scale",
          },
        },
        {
          id: "idea-workflow",
          type: "idea-pin",
          icon: "idea-pin",
          position: {
            x: 644.5853083482486,
            y: 119.79046061294511,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Idea",
            text: "Add SQS queue for better decoupling between components",
          },
        },
        {
          id: "idea-performance",
          type: "idea-pin",
          icon: "idea-pin",
          position: {
            x: 697.247324613556,
            y: 541.4595719381686,
          },
          size: {
            w: 240,
            h: 120,
          },
          connectors: ["top", "right", "bottom", "left"],
          data: {
            name: "Idea",
            text: "Implement caching with ElastiCache to reduce latency",
          },
        },
      ],
      edges: [
        {
          id: "xy-edge__lambda-authleft-source-api-gatewayright-target",
          from: {
            nodeId: "lambda-auth",
            port: "right",
          },
          to: {
            nodeId: "api-gateway",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__cognitoleft-source-lambda-authright-target",
          from: {
            nodeId: "cognito",
            port: "right",
          },
          to: {
            nodeId: "lambda-auth",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__lambda-asynctop-source-lambda-authbottom-target",
          from: {
            nodeId: "lambda-async",
            port: "right",
          },
          to: {
            nodeId: "lambda-auth",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__lambda-notifytop-source-lambda-authbottom-target",
          from: {
            nodeId: "lambda-notify",
            port: "right",
          },
          to: {
            nodeId: "lambda-auth",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__s3-storagetop-source-lambda-notifybottom-target",
          from: {
            nodeId: "s3-storage",
            port: "right",
          },
          to: {
            nodeId: "lambda-notify",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__dynamodbtop-source-lambda-asyncbottom-target",
          from: {
            nodeId: "dynamodb",
            port: "right",
          },
          to: {
            nodeId: "lambda-async",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
        {
          id: "xy-edge__lambda-processorleft-source-s3-storageright-target",
          from: {
            nodeId: "lambda-processor",
            port: "right",
          },
          to: {
            nodeId: "s3-storage",
            port: "left",
          },
          relation: "association",
          labels: {},
          style: {
            dashed: false,
          },
        },
      ],
    },
  ],
};
