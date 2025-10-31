import localFont from "next/font/local";

export const iowan = localFont({
  src: [
    {
      path: "../public/fonts/iowan-old-style.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/iowan-old-style-italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  // variable: "--font-iowan",
  // display: "swap",
});


