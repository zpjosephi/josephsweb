// Tiny visit counter backed by Upstash Redis over its REST API.
// No SDK: one fetch per call. Stays silent (views: null) until the store env
// vars exist, so the site works fine before Upstash is connected on Vercel.
export const dynamic = "force-dynamic";

const URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "site:views";

const ready = Boolean(URL && TOKEN);

async function redis(path: string): Promise<number | null> {
  if (!ready) return null;
  const res = await fetch(`${URL}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  const data = (await res.json()) as { result: string | number | null };
  return data.result === null ? 0 : Number(data.result);
}

export async function GET() {
  try {
    const views = await redis(`get/${KEY}`);
    return Response.json({ views, configured: ready });
  } catch {
    return Response.json({ views: null, configured: false });
  }
}

export async function POST() {
  try {
    const views = await redis(`incr/${KEY}`);
    return Response.json({ views, configured: ready });
  } catch {
    return Response.json({ views: null, configured: false });
  }
}
