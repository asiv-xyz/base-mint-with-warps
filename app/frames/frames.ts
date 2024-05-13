import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";
import {imagesWorkerMiddleware} from "frames.js/middleware/images-worker";

export const frames = createFrames({
    basePath: "/frames",
    middleware: [ farcasterHubContext({
        hubHttpUrl: "https://nemes.farcaster.xyz:2281",
    }), imagesWorkerMiddleware({ imagesRoute: "/mint", secret: "SOME_SECRET_VALUE", }),]
});
