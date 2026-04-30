export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Incoming body:", body);

    const matchRes = await fetch(
      "https://hayat22.app.n8n.cloud/webhook/match-scholarships",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    console.log("STATUS:", matchRes.status);

    const text = await matchRes.text();
    console.log("RAW RESPONSE:", text);

    if (!matchRes.ok) {
      return Response.json(
        { error: "n8n failed", details: text },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    return Response.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return Response.json({ error: "server crash" }, { status: 500 });
  }
}