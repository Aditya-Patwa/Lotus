import { put } from '@vercel/blob';

export async function POST(request: Request) {
    const res = await request.json();

    console.log(res);
    const blob = await put(`notes/${res.title}.json`, JSON.stringify(res), { access: 'public' });

    return Response.json({blob});
}