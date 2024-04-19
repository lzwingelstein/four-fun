import SmallButton from "@/components/Buttons/SmallButton";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

export default function PlayVsPlayerPage() {
  return (
    <main className="flex flex-col h-[100vh] p-5">
      <nav className="py-10">
        <ul className="flex flex-row justify-between items-center">
          <li className="w-fit">
            <SmallButton>MENU</SmallButton>
          </li>
          <li className="w-fit">
            <Image src={logo} width={58} height={61} alt="logo"></Image>
          </li>
          <li className="w-fit">
            <SmallButton>RESTART</SmallButton>
          </li>
        </ul>
      </nav>
    </main>
  );
}
