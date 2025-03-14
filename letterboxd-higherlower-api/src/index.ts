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

		// if (pathname === "/api/csv") {
		// 	try {
		// 		const formData = await request.formData();
		// 		const csvFile = formData.get("file");
		
		// 		if (!csvFile || !(csvFile instanceof File)) {
		// 		  return new Response("No file uploaded or invalid file", { status: 400 });
		// 		}
		
		// 		const csvText = await csvFile.text();
				
		// 		const parsedData = parseCSV(csvText);
			  
		// 		// Insert parsed data into the D1 database
		// 		for (const row of parsedData) {
		// 			const { title, movie_url, poster_url, rating, genre } = row;
		// 			await env.DB.prepare(
		// 			`
		// 			INSERT INTO Movies (movie_name, rating, poster_url, movie_url, genre)
		// 			VALUES (?, ?, ?, ?, ?)
		// 			`
		// 			)
		// 			.bind(title, parseFloat(rating), poster_url, movie_url, genre)
		// 			.run();
		// 		}
	  
		// 	  return new Response("CSV data inserted successfully!", {
		// 		headers: { ...corsHeaders },
		// 	  });
		// 	} catch (error) {
		// 	  return new Response(`Error processing CSV: ${error}`, {
		// 		status: 500,
		// 		headers: { ...corsHeaders },
		// 	  });
		// 	}
		//   }
	  

		return new Response(
			"Call it.",
		);
	},
} satisfies ExportedHandler<Env>;

// function parseCSV(csvText: string): Array<{ title: string, movie_url: string, poster_url: string, rating: string, genre: string }> {
// 	const rows = csvText.split("\n"); // Split into rows
// 	console.log(rows[3])
// 	let headers = rows[0].split(",")
// 	headers[4] = "genre";
// 	console.log(headers)
// 	const data = rows.slice(1).map((row) => {
		
// 	  const columns = row.split(",");
// 	  const rowObject: any = {};
  
// 	  columns.forEach((value, index) => {
// 		const cleanedValue = value.trim().replace(/\r/g, ""); // remove carriage return

// 		if (headers[index] === "rating") {
// 			console.log(cleanedValue)
// 		}
// 		rowObject[headers[index]] = cleanedValue;
// 	  });
// 	  return rowObject;
// 	});
  
// 	return data;
//   }
  