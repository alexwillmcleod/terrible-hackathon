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
        <header className="relative h-fit flex justify-center my-8 border-b-2 border-black pb-12 mx-auto max-w-3xl w-full mb-12">
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
        <div className="h-16 w-full"></div>
        {children}
        <footer className="bg-yellow-100">
          <div className="flex justify-between gap-8 items-center mx-auto max-w-6xl py-12 px-8">
            <Link href="/" aria-label="Home">
              <Image className="w-32 object-contain" src={Logo} alt="" />
            </Link>
            <div className="text-center">
              <h3 className="text-2xl text-bold mb-4">
                Created in a weekend by
              </h3>
              <div className="italic text-md text-gray-600">
                <p>Matthew Tao</p>
                <p>Alex McLeod</p>
                <p>Weizhou Xue</p>
                <p>Varshini Bhat</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
