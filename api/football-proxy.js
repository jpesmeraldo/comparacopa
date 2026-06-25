export default async function handler(req, res) {
  // CORS Headers
  const origin = req.headers.origin;
  const allowedOrigins = ['https://comparacopa.com.br', 'https://www.comparacopa.com.br'];
  
  let corsOrigin = 'https://comparacopa.com.br';
  if (origin) {
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isProd = allowedOrigins.includes(origin);
    if (isLocal || isProd) {
      corsOrigin = origin;
    }
  }
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing API_FOOTBALL_KEY environment variable" });
  }

  const { endpoint, league, season } = req.query;

  if (!endpoint || !league || !season) {
    return res.status(400).json({ error: "Missing required query parameters: endpoint, league, season" });
  }

  try {
    const apiUrl = `https://v3.football.api-sports.io/${endpoint}?league=${league}&season=${season}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal Server Error during proxy request" });
  }
}
