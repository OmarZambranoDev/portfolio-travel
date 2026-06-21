import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { type PlannerFormData } from '@/types/planner';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const body: PlannerFormData = await req.json();
  const { destination, duration, travelStyle, budget } = body;

  const systemPrompt = `You are an expert travel planner. Generate detailed, practical daily itineraries.
Format your response in markdown with:
- A brief intro paragraph
- Day-by-day breakdown using ### Day N: Title format
- 3-4 activities per day with brief descriptions
- Practical tips at the end
Keep responses concise and actionable. Never exceed ${duration} days.`;

  const userPrompt = `Create a ${duration}-day ${travelStyle.toLowerCase()} itinerary for ${destination}.
Budget tier: ${budget}.
Include must-see attractions, local food recommendations, and practical logistics.`;

  try {
    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Anthropic.APIError && error.status === 529
        ? 'AI planner is temporarily unavailable. Please try again later.'
        : error instanceof Anthropic.APIError && error.message.includes('credit')
          ? 'AI planner is temporarily unavailable. Please try again later.'
          : 'Failed to generate itinerary';

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
