import imgMarkerRed from "@/assets/images/marker-red.svg";
import imgMarkerYellow from "@/assets/images/marker-yellow.svg";
import { Cell, Player } from "@/lib/types";
import classes from "./index.module.css";
import Image from "next/image";

type BoardInputProps = {
  player: Player;
  className?: string;
  board: Cell[][];
  onClick: (column: number) => void;
};
export default function BoardInput({
  player,
  className,
  onClick,
}: BoardInputProps) {
  let rows = [];

  for (let i = 0; i < 7; i++) {
    rows.push(
      <div
        className={`${classes.boardInput} h-full flex-1 relative`}
        onClick={() => onClick(i)}
        key={`input-row-${i}`}
        data-testid={`input-row-${i}`}
      >
        <Image
          src={player === Player.ONE ? imgMarkerRed : imgMarkerYellow}
          className={`${classes.marker} hidden flex-1 h-[22px] w-[20px] absolute top-[-36px] left-0 right-0 mx-auto`}
          alt="marker"
          width={32}
          height={26}
        ></Image>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${className} w-full h-full flex flex-row pt-[13px] pr-1 pl-1 pb-[30px] `}
      >
        {rows}
      </div>
    </>
  );
}
