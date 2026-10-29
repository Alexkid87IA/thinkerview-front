export const config = { runtime: 'edge' };

const SOURCE = 'https://api.tipeee.com/v2.0/projects/thinkerview';

// L'API Tipeee v2.0 n'est pas documentée publiquement : elle est celle que consomme
// leur propre front. On ne lit que deux champs et on renvoie 502 si leur forme change,
// pour que le composant retombe sur ses valeurs de repli plutôt que d'afficher 0.
export default async function handler(): Promise<Response> {
  try {
    const upstream = await fetch(SOURCE, {
      headers: { accept: 'application/json' },
    });

    if (!upstream.ok) {
      return json({ error: 'upstream' }, 502);
    }

    const data = await upstream.json();
    const tipeurs = Number(data?.parameters?.tipperNumber);
    const montantMensuel = Number(data?.parameters?.tipperAmount);

    if (!Number.isFinite(tipeurs) || !Number.isFinite(montantMensuel)) {
      return json({ error: 'shape' }, 502);
    }

    return json(
      { tipeurs, montantMensuel, updatedAt: new Date().toISOString() },
      200,
      'public, s-maxage=900, stale-while-revalidate=86400'
    );
  } catch {
    return json({ error: 'fetch' }, 502);
  }
}

function json(body: unknown, status: number, cache = 'no-store'): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': cache },
  });
}
