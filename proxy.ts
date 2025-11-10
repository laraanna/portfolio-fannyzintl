// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

// Protect only your custom domain(s); allow *.vercel.app to stay open
const PROTECTED_HOSTS = new Set(["fannyzintl.com", "www.fannyzintl.com"]);

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!PROTECTED_HOSTS.has(host)) return NextResponse.next();

  // Optional secret link: https://yourdomain.com?key=SECRET_PREVIEW_KEY
  const url = new URL(req.url);
  if (process.env.SECRET_PREVIEW_KEY && url.searchParams.get("key") === process.env.SECRET_PREVIEW_KEY) {
    return NextResponse.next();
  }

  // Handle HTTP Basic Auth
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.split(" ")[1] || "", "base64").toString();
    const [user, pass] = decoded.split(":");
    if (user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS) {
      return NextResponse.next();
    }
  }

  // Ask the browser to prompt for credentials
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

// Run on everything except static assets/images
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
