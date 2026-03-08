export default async function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json({
      status: "API is working",
      message: "Use POST to send prompt"
    });
  }

  try {

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You convert video scenes into extremely detailed cinematic prompts."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
}
