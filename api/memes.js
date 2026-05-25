export default async function handler(req, res) {
  const { num } = req.query || {};
  const url = num
    ? `https://xkcd.com/${num}/info.0.json`
    : `https://xkcd.com/info.0.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).end();
    const data = await response.json();
    // cache on edge for 1 hour
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=59");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
