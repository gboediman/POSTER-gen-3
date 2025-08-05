const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { title, subtitle, caption, desc } = JSON.parse(event.body);

  const prompt = `Create a master-piece modern of Jessica Walsh - Felix Pfäffli - Emily Oberman, vertical poster with title "${title}", subtitle "${subtitle}", caption "${caption}", and an image of "${desc}". Return only the image URL.`;

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB0_q-c6pY4zFJh-_l9kfWB8I-0FIeDo_A', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const result = await response.json();
  const imageUrl = result?.candidates?.[0]?.content?.parts?.[0]?.text;

  return {
    statusCode: 200,
    body: JSON.stringify({ imageUrl })
  };
};
