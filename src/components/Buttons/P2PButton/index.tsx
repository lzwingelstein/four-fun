import clsx from "clsx";
import playerVsPlayer from "../../../assets/images/player-vs-player.svg";
import Image from "next/image";
import classes from "../shadow.module.css";

export default function P2PButton({
  className,
  ...props
}: Readonly<{
  className?: string;
}>) {
  return (
    <button
      className={clsx(
        "bg-primary text-black font-bold py-2 px-4 rounded-[20px] flex justify-between items-center w-[335px] h-[72px] mb-2",
        className,
        classes.mshadow
      )}
      {...props}
    >
      <h2>PLAY VS PLAYER</h2>
      <Image
        src={playerVsPlayer}
        alt="player-vs-player"
        width={76}
        height={40}
      />
    </button>
  );
}
