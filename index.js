import http from "http";

const port = process.env.PORT || 3000;

// MCP server básico: luego lo convertiremos en server MCP real
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "MCP server running" }));
});

server.listen(port, () => {
  console.log(`Servidor MCP escuchando en puerto ${port}`);
});
