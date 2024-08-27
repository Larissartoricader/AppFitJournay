import dbConnect from "../../../../db/connect";
import User from "../../../../models/User";

export async function GET(req, { params }) {
  await dbConnect();

  // Log URL para verificar o que está sendo recebido
  console.log("Request URL:", req.url);
  console.log("Request Params:", params);

  try {
    const userId = params.id; // Extraí o ID dos parâmetros da rota

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Procure o usuário no banco de dados com base no ID
    const user = await User.findById(userId);

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
