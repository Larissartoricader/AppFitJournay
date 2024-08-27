// api/users/email/route.js

import dbConnect from "../../../../db/connect";
import User from "../../../../models/User";

export async function GET(req) {
  await dbConnect();

  // Log URL para verificar o que está sendo recebido
  console.log("Request URL:", req.url);

  try {
    const url = new URL(req.url, `https://${req.headers.host}`); // Adicione a origem para construir URL corretamente
    const email = url.searchParams.get("email");

    // Log para verificar o parâmetro email extraído
    console.log("Extracted Email:", email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email query parameter is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await User.findOne({ email });

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
