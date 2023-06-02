import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="bg-bggray min-h-screen ">
      <div className="block md:hidden flex items-center p-4 ">
        <button onClick={() => setShowNav(!showNav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        <div className=" flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className=" flex-grow  p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
