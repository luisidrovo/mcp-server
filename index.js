import http from "http";

const port = process.env.PORT || 3000;

// MCP server básico (mejorado con ruta raíz `/`)
const server = http.createServer((req, res) => {
  // Ruta raíz para cron-job y health checks
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("MCP Server OK");
    return;
  }

  // Aquí puedes manejar tus rutas MCP reales
  if (req.url.startsWith("/tool/") && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // POR AHORA devolvemos eco para saber que funciona
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "MCP tool called",
            tool: req.url.replace("/tool/", ""),
            received: data
          })
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON", detail: error.toString() }));
      }
    });
    return;
  }

  // Si ninguna ruta coincide → 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(port, () => {
  console.log(`Servidor MCP escuchando en puerto ${port}`);
});

