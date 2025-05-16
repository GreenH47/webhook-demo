import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import Image from 'next/image'
import KingdomLogo from "../assets/logo/kingdom-technology-logo.jpg";
import GreenLogo from "../assets/logo/green-logo.png";

export default function Header() {
  return (
      <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center">
              <a
                  href="https://www.linkedin.com/company/kingdomtechnology-au/"
                  target="_blank"
                  rel="noreferrer"
              >
                  <Image
                      src={KingdomLogo}
                      alt="Kingdom Technology logo"
                      width={48}
                      height={48}
                  />
              </a>
              <span className="border-l rotate-45 h-6"/>
              <a href="https://greenhuang.com/" target="_blank" rel="noreferrer">
                  <Image
                      src={GreenLogo}
                      alt="Green Huang logo"
                      width={48}
                      height={48}
                  />
              </a>
          </div>


          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
              Green Huang Demo for Front End Developer intern
          </p>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"/>
      </div>
  );
}
