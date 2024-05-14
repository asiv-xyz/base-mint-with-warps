import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "Surfy Frames",
    other: {
      ...(await fetchMetadata(
          new URL(
              "/frames/intro",
              process.env.VERCEL_URL
                  ? `https://${process.env.VERCEL_URL}`
                  : "http://localhost:3000"
          )
      )),
    },
  };
}


export default async function Page() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-center min-h-screen items-start font-body">
        Surfy Frames
      </div>
    </div>
  );
}
