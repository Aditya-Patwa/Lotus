import { put } from '@vercel/blob';

export async function POST(request: Request) {
    const res = await request.formData();
    const file = res.get('file') as File;
    const blob = await put(`files/${file.name}`, file, { access: 'public' });

    return Response.json({
        success : 1,
        file: {
            name: blob.pathname,
            size: file.size,
            url : blob.url,
            title: blob.pathname
        }
    });
}