import { Cell } from "@/lib/types";
import Token from "../Token";

type BoardGridProps = {
  className?: string;
  value: Cell[][];
};
export default function BoardGrid({ className, value }: BoardGridProps) {
  let rows = [];

  for (let i = 0; i < 7; i++) {
    const tokens = [];
    const col: Cell[] = value[i];
    for (let x = col.length - 1; x >= 0; x--) {
      tokens.push(<Token value={col[x]} key={`cell-${x}-${i}`}></Token>);
    }
    rows.push(
      <div className={`h-full flex-1 relative`} key={`row-${i}`}>
        <div className="h-full grid grid-rows-6 justify-items-center items-center">
          {tokens}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${className} w-full h-full flex flex-row pt-[13px] pr-1 pl-1 pb-[30px]`}
      >
        {rows}
      </div>
    </>
  );
}
