import { createImagesWorker } from "frames.js/middleware/images-worker/next";
import {ImageResponse} from "@vercel/og";

const imagesRoute = createImagesWorker();

export const GET = imagesRoute(async (jsx) => {
    console.log('imageRoute', jsx)
    return new ImageResponse((<>{jsx}</>), {
        width: 1080, height: 1080
    })
});
