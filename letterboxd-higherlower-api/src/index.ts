/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers": 'Content-Type'
		  };
	  
		  if (request.method === "OPTIONS") {
			// Handle CORS preflight requests
			return new Response(null, {
			  headers: {...corsHeaders}
			})
		  }
		  

		const { pathname } = new URL(request.url);

		if (pathname === "/api/newmovie") {
			const { results } = await env.DB.prepare(
				`
				SELECT * FROM Movies 
				ORDER BY RANDOM()
				LIMIT 1;
				`
			)
				.all();
			return new Response (JSON.stringify(results), {
				headers: {
					...corsHeaders,
				},
			});
		}

		return new Response(
			"Call it.",
		);
	},
} satisfies ExportedHandler<Env>;
