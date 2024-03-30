import { put } from '@vercel/blob';

export async function POST(request: Request) {
    const res = await request.formData();
    const file = res.get('image') as File;
    const blob = await put(`images/${file.name}`, file, { access: 'public' });


    return Response.json({
        success : 1,
        file: {
            url : blob.url,
        }
    });
}