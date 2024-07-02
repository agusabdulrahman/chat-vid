import { NextResponse } from 'next/server';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    const { transcript } = await request.json();
    console.log('transcript', transcript);

    const prompt = `In detail, summarize this youtube video transcript ${transcript}`;

    console.log('OpenAI Secret Key:', process.env.OPENAI_SECRET_KEY);

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-1106',
        messages: [{ role: 'user', content: prompt }],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
      },
    });

    if (openaiResponse.ok) {
      const openaiData = await openaiResponse.json();
      console.log(openaiData);
      if (openaiData.choices && openaiData.choices.length > 0 && openaiData.choices[0].message && openaiData.choices[0].message.content) {
        const generatedText = openaiData.choices[0].message.content;
        return Response.json({ generatedText }, { headers: corsHeaders });
      }
    } else {
      throw new Error('OpenAI response not ok');
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { headers: corsHeaders });
  }
}
