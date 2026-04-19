import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const usersPath = join(rootDir, 'src', 'data', 'users.json');
const incidentsPath = join(rootDir, 'src', 'data', 'incidents.json');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const users = JSON.parse(await readFile(usersPath, 'utf8'));
const seedIncidents = JSON.parse(await readFile(incidentsPath, 'utf8'));
let incidents = structuredClone(seedIncidents);

function json(res, status, payload) {
  res.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(payload, null, 2));
}

async function readBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw);
}

function findUserById(userId) {
  if (userId == null || userId === '') {
    return null;
  }

  return users.find((user) => user.id === userId) ?? null;
}

function normalizeIncident(input, existingIncident) {
  const now = new Date().toISOString();

  return {
    id: existingIncident?.id ?? input.id ?? crypto.randomUUID(),
    title: String(input.title ?? existingIncident?.title ?? 'Untitled incident').trim(),
    description: String(input.description ?? existingIncident?.description ?? '').trim(),
    severity: input.severity ?? existingIncident?.severity ?? 'medium',
    status: input.status ?? existingIncident?.status ?? 'open',
    assignee:
      'assigneeId' in input
        ? findUserById(input.assigneeId)
        : input.assignee ?? existingIncident?.assignee ?? null,
    createdAt: existingIncident?.createdAt ?? input.createdAt ?? now,
    updatedAt: now,
    tags: Array.isArray(input.tags)
      ? input.tags.filter(Boolean)
      : existingIncident?.tags ?? [],
  };
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    json(res, 400, { message: 'Missing request URL.' });
    return;
  }

  const url = new URL(req.url, 'http://localhost:4000');
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') {
    json(res, 204, {});
    return;
  }

  if (req.method === 'GET' && pathname === '/api/health') {
    json(res, 200, { ok: true });
    return;
  }

  if (req.method === 'GET' && pathname === '/api/users') {
    json(res, 200, users);
    return;
  }

  if (req.method === 'GET' && pathname === '/api/incidents') {
    await delay(500);

    if (Math.random() < 0.1) {
      json(res, 500, { message: 'Simulated API failure.' });
      return;
    }

    json(res, 200, incidents);
    return;
  }

  if (req.method === 'GET' && pathname.startsWith('/api/incidents/')) {
    const incidentId = pathname.replace('/api/incidents/', '');
    const incident = incidents.find((entry) => entry.id === incidentId);

    if (!incident) {
      json(res, 404, { message: `Incident ${incidentId} not found.` });
      return;
    }

    json(res, 200, incident);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/incidents') {
    const payload = await readBody(req);
    const incident = normalizeIncident(payload);
    incidents = [incident, ...incidents];
    json(res, 201, incident);
    return;
  }

  if ((req.method === 'PUT' || req.method === 'PATCH') && pathname.startsWith('/api/incidents/')) {
    const incidentId = pathname.replace('/api/incidents/', '');
    const existingIncident = incidents.find((entry) => entry.id === incidentId);

    if (!existingIncident) {
      json(res, 404, { message: `Incident ${incidentId} not found.` });
      return;
    }

    const payload = await readBody(req);
    const updatedIncident = normalizeIncident(payload, existingIncident);

    incidents = incidents.map((entry) => (entry.id === incidentId ? updatedIncident : entry));
    json(res, 200, updatedIncident);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/reset') {
    incidents = structuredClone(seedIncidents);
    json(res, 200, { ok: true });
    return;
  }

  json(res, 404, { message: `No route for ${req.method} ${pathname}` });
});

server.listen(4000, () => {
  console.log('Mock API running on http://localhost:4000');
});
