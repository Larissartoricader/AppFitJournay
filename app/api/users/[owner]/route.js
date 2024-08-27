import dbConnect from "../../../../db/connect";
import User from "../../../../models/User";

export async function GET(req) {
  await dbConnect();

  // Log URL para verificar o que está sendo recebido
  console.log("Request URL:", req.url);

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const owner = url.searchParams.get("owner"); // Extrai o parâmetro owner da query string

    // Log para verificar o parâmetro owner extraído
    console.log("Extracted Owner:", owner);

    if (!owner) {
      return new Response(
        JSON.stringify({ error: "Owner query parameter is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await User.findOne({ owner });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
