import localFont from "next/font/local";

export const iowan = localFont({
  src: [
    {
      path: "../public/fonts/Iowan-Old-Style.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-iowan",
  display: "swap",
});


