export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, image_url } = req.body;

  return res.status(200).json({
    message: `你发来的内容是：${text}，图片地址是：${image_url}`
  });
}
