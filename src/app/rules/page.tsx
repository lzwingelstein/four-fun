import Image from "next/image";
import Link from "next/link";
import IconCheck from "@/assets/images/icon-check.svg";

export default function RulesPage() {
  return (
    <main className="flex flex-col h-[100vh] justify-center items-center p-5">
      <div className="dshape bg-white px-3 w-full py-8 rounded-[48px] relative">
        <h1 className="text-center">RULES</h1>
        <p className="pb-6"></p>
        <h3 className="text-purple-500">OBJECTIVE</h3>
        <p className="pb-4"></p>
        <p>
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
        <p className="pb-14"></p>
        <h3 className="text-purple-500">HOW TO PLAY</h3>
        <p className="pb-6"></p>
        <ol className="list-decimal ml-4 space-y-2">
          <li>Red goes first in the first game.</li>
          <li>
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </li>
          <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
          <li>
            The starter of the previous game goes second on the next game.
          </li>
        </ol>
        <p className="pb-6"></p>
        <Link
          href="/"
          className="absolute bottom-[-34px] left-0 right-0 mx-auto w-fit"
        >
          <Image src={IconCheck} alt="icon-check" width={64} height={64} />
        </Link>
      </div>
    </main>
  );
}
