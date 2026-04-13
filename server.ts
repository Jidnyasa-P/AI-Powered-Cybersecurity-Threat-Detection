import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/predict", (req, res) => {
    const { packet_size, failed_logins, request_frequency } = req.body;

    // Mock AI Logic (Simulating Random Forest)
    let threatDetected = false;
    let threatType = "None";
    let confidence = 0.95;

    if (failed_logins > 3) {
      threatDetected = true;
      threatType = "Brute Force Attack";
      confidence = 0.85 + Math.random() * 0.1;
    } else if (request_frequency > 200 && packet_size > 1000) {
      threatDetected = true;
      threatType = "DoS Attack";
      confidence = 0.9 + Math.random() * 0.08;
    } else if (packet_size > 5000) {
      threatDetected = true;
      threatType = "Data Exfiltration";
      confidence = 0.75 + Math.random() * 0.15;
    }

    res.json({
      threat_detected: threatDetected,
      threat_type: threatType,
      confidence: confidence.toFixed(4),
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/stats", (req, res) => {
    // Mock statistics for the dashboard
    res.json({
      total_packets: 125430,
      threats_blocked: 142,
      system_health: "98%",
      uptime: "14d 6h 22m",
      traffic_history: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        packets: Math.floor(Math.random() * 5000) + 1000,
        threats: Math.random() > 0.8 ? Math.floor(Math.random() * 5) : 0,
      })),
      threat_distribution: [
        { name: "Brute Force", value: 45 },
        { name: "DoS", value: 30 },
        { name: "Malware", value: 15 },
        { name: "Phishing", value: 10 },
      ],
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
