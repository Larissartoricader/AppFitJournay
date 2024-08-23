import dbConnect from "../../../../db/connect";
import User from "../../../../models/User";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const email = url.searchParams.get("email");

  if (!email) {
    return new Response(
      JSON.stringify({ error: "Email query parameter is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const user = await User.findOne({ email: email });

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
