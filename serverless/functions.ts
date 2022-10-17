import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  createRoom: {
    handler: "src/functions/setReminder/index.handler",
    events: [
      {
        websocket: {
          route: 'createRoom'
        }
      }
    ]
  },
};

export default functions;