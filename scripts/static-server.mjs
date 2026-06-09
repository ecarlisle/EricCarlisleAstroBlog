/**
 * Minimal static file server for Lighthouse audits.
 * Serves files from `dist/` with clean-URL support (/about/ → /about/index.html).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.argv[2] || "dist";
const PORT = parseInt(process.argv[3] || "4321", 10);

const MIME = {
	".html": "text/html",
	".css": "text/css",
	".js": "text/javascript",
	".webp": "image/webp",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".xml": "application/xml",
	".json": "application/json",
};

http.createServer((req, res) => {
	let file = req.url.split("?")[0];
	// Clean URLs: /about/ → /about/index.html, / → /index.html
	if (!file.includes(".")) file = file.replace(/\/?$/, "/index.html");
	const p = path.join(ROOT, file);
	if (!p.startsWith(path.resolve(ROOT))) {
		res.writeHead(403);
		res.end();
		return;
	}
	try {
		const data = fs.readFileSync(p);
		const ext = path.extname(p).toLowerCase();
		res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
		res.end(data);
	} catch {
		res.writeHead(404);
		res.end();
	}
}).listen(PORT, () => {
	// stderr so it doesn't mix with stdout if called from a script
	console.error(`✅ Static server on http://localhost:${PORT}`);
});
