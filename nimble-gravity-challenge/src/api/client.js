const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('Missing VITE_BASE_URL. Create a .env file (see .env.example).');
}

async function parseError(res) {
  const status = res.status;

  let body = null;
  try {
    body = await res.json();
  } catch {
    try {
      body = await res.text();
    } catch {
      body = null;
    }
  }

  const message =
    (body && (body.message || body.error || body.msg)) ||
    (typeof body === 'string' && body) ||
    res.statusText ||
    'Unknown error';

  return { status, message, details: body };
}

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw await parseError(res);
  return await res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw await parseError(res);
  return await res.json();
}