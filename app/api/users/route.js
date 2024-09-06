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
// POST

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

// DELETE

export async function DELETE(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: "Missing user id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting user profile:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user profile" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
