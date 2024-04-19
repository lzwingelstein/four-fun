import clsx from "clsx";
import P2C from "../../../assets/images/player-vs-cpu.svg";
import classes from "../shadow.module.css";
import BLink from "../BLink";

export default function P2CButton({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <BLink
      href="/play-vs-cpu"
      text="PLAY VS CPU"
      icon={P2C}
      className={clsx(
        "bg-primary text-black font-bold py-2 px-4 rounded-[20px] flex justify-between items-center w-[335px] h-[72px] mb-2",
        className,
        classes.mshadow
      )}
    ></BLink>
  );
}
