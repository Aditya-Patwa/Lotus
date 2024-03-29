import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let url = searchParams.get("url");

    let res = await fetch(url!);
    let data = await res.text();


    let $ = cheerio.load(data); // Load HTML using Cheerio
    let title = $('title').text(); // Get webpage title
    let description = $('meta[name="description"]').attr('content'); // Get meta description
    let faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href'); // Get favicon link
    let faviconUrl = '';
    if (faviconLink) {
      faviconUrl = new URL(faviconLink, url!).href; // Construct absolute URL for favicon
    }

    console.log(title, description, faviconUrl);

    return NextResponse.json({
        status: 1,
        link: url,
        meta: {
            title: title,
            description: description,
            image: {
                url: faviconUrl
            }
        }
    });
}