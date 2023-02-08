import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (client) => {
  client.on("message", (rowMessage) => {
    const { name, message } = JSON.parse(rowMessage);
    [...wss.clients]
      .filter((c) => c !== client)
      .forEach((c) => c.send(JSON.stringify({ name, message })));
  });
});
