import Image from "next/image";
import Link from "next/link";
import InfoIcon from "../assets/info.png";
import Logo from "../assets/logo.png";
import "./globals.css";

export const metadata = {
  title: "Things News",
  description: "Fake news generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="relative h-fit flex justify-center my-8 border-b-2 border-black pb-4 mx-auto max-w-3xl w-full mb-12">
          <Link href="/" aria-label="Home">
            <Image src={Logo} alt="" />
          </Link>
          <Link href="https://github.com/alexwillmcleod/terrible-hackathon">
            <Image
              className="absolute top-0 right-0"
              src={InfoIcon}
              alt="Github page"
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
