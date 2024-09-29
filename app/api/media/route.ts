import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
    // Extract media type and file name from query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'video' or 'audio'
    const fileName = searchParams.get('file'); // name of the file

    if (!type || !fileName) {
        return NextResponse.json(
            { error: "Missing type or file name" },
            { status: 400 }
        );
    }

    try {
        // Define the file path based on the type (video/audio)
        const filePath = path.join(process.cwd(), 'public', type, fileName);

        // Read the file as a buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Set correct content type based on file extension
        const contentType =
            type === 'video'
                ? 'video/mp4'
                : type === 'audio'
                    ? 'audio/mpeg'
                    : 'application/octet-stream';

        // Return the file as a blob
        return new Response(fileBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Length': fileBuffer.length.toString(),
                'Cache-Control': 'public, max-age=3600', // optional: cache for 1 hour
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to load the media file" },
            { status: 500 }
        );
    }
}
