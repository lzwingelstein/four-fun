import Image from "next/image";
import logo from "../assets/images/logo.svg";
import P2PIcon from "../assets/images/player-vs-player.svg";
import BLink from "@/components/Buttons/BLink";

export default function Home() {
  return (
    <main className="flex flex-col h-[100vh] justify-center items-center">
      <Image src={logo} width={58} height={61} alt="logo"></Image>
      <p className="pb-[80px]"></p>
      <BLink
        href="/play-vs-player"
        text="PLAY VS PLAYER"
        icon={P2PIcon}
        className="bg-primary"
      ></BLink>
      <p className="pb-6"></p>
      <BLink href="/rules" text="GAME RULES" className="bg-white"></BLink>
      <p className="pb-[80px]"></p>
      <p className="pb-[52px]"></p>
    </main>
  );
}
