import { Cell, Player } from "@/lib/types";
import CounterRed from "../../assets/images/counter-red-small.svg";
import CounterYellow from "../../assets/images/counter-yellow-small.svg";
type TokenProps = {
  value: Cell;
  className?: string;
};
export default function Token({ className, value }: TokenProps) {
  let image;
  if (value == Player.ONE) {
    image = CounterRed.src;
  } else if (value == Player.TWO) {
    image = CounterYellow.src;
  }

  return (
    <div
      className={`${className} h-[36px] w-[36px] z-20`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
}
