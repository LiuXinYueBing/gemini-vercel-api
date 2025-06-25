export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, image_url } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text input' });
  }

  const payload = {
    contents: [
      {
        parts: image_url
          ? [
              { text: text },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: await fetchBase64(image_url),
                },
              },
            ]
          : [{ text }],
      },
    ],
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=AIzaSyCcJTuIiSr-kvtvtNXYV0wkmSe4jNumKCo`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

  res.status(200).json({ result });
}

async function fetchBase64(imageUrl) {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
}
