import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("ArtHub");

export async function POST(request) {
  try {
    const artwork = await request.json();
    const result = await db.collection("artworks").insertOne({
      ...artwork,
      createdAt: new Date(),
    });

    return Response.json({ insertedId: result.insertedId }, { status: 201 });
  } catch {
    return Response.json(
      { message: "Failed to add artwork" },
      { status: 500 }
    );
  }
}
