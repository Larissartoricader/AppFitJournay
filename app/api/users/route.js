import dbConnect from "../../../db/connect";
import User from "../../../models/User";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { owner, email, entries, projection, impressions } = body;

    if (!owner || !email || !projection) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newUser = new User({
      owner,
      email,
      entries: entries || [],
      projection: projection || 0,
      impressions: impressions || [],
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
