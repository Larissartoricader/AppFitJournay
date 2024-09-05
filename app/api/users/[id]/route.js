import dbConnect from "../../../../db/connect";
import User from "../../../../models/User";

export async function GET(req, { params }) {
  await dbConnect();

  console.log("Request URL:", req.url);
  console.log("Request Params:", params);

  try {
    const userId = params.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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
// POST
export async function POST(req, { params }) {
  await dbConnect();

  const userId = params.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id, date, weight, feeling } = await req.json();

    const newEntry = { id, date: new Date(date), weight, feeling };

    user.entries.push(newEntry);

    await user.save();

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding entry:", error);
    return new Response(JSON.stringify({ error: "Failed to add entry" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

//DELETE

export async function DELETE(req, { params }) {
  await dbConnect();

  const userId = params.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { id } = await req.json();

    const entryIndex = user.entries.findIndex((entry) => entry.id === id);

    if (entryIndex === -1) {
      return new Response(JSON.stringify({ error: "Entry not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    user.entries.splice(entryIndex, 1);

    await user.save();

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return new Response(JSON.stringify({ error: "Failed to delete entry" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
