"use client";
import SmallButton from "@/components/Buttons/SmallButton";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import IconPlayer1 from "@/assets/images/player-one.svg";
import IconPlayer2 from "@/assets/images/player-two.svg";
import BoardLayerWhiteSmall from "@/assets/images/board-layer-white-small.svg";
import BoardLayerBlackSmall from "@/assets/images/board-layer-black-small.svg";
import TurnBackgroundRed from "@/assets/images/turn-background-red.svg";
import TurnBackgroundYellow from "@/assets/images/turn-background-yellow.svg";
import { useRef, useState } from "react";
import { Game } from "@/lib/game";
import { Player, Status } from "@/lib/types";
import BoardGrid from "@/components/BoardGrid";
import BoardInput from "@/components/BoardInput";

export default function PlayVsPlayerPage() {
  const [counter, setCounter] = useState(15);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const game = useRef<Game>(new Game({ firstToPlay: Player.ONE }));
  const [, setForceUpdate] = useState(Date.now());

  function pushToken(column: number) {
    if (game.current.status !== Status.RUNNING) {
      return;
    }
    const err = game.current.pushToken(column);
    if (err != null) {
      alert(err);
    }

    if (game.current.winner === Player.ONE) {
      setScore({ player1: score.player1 + 1, player2: score.player2 });
    } else if (game.current.winner === Player.TWO) {
      setScore({ player1: score.player1, player2: score.player2 + 1 });
    }
    setForceUpdate(Date.now());
  }

  function playAgain() {
    const firstToPlay =
      game.current.currentPlayer === Player.ONE ? Player.TWO : Player.ONE;
    game.current = new Game({ firstToPlay });
    setForceUpdate(Date.now());
  }

  return (
    <main className="flex flex-col h-[100vh]">
      <div className="px-5 z-20">
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
        <div className="flex flex-row w-full">
          <div className="flex-1">
            <div className="bshape h-[80px] w-fit px-7 bg-white flex flex-col items-center justify-center relative ml-[27px]">
              <h4>PLAYER&nbsp;1</h4>
              <h3>{score.player1}</h3>
              <Image
                className="absolute bottom-0 top-0 my-auto left-[-27px]"
                src={IconPlayer1}
                alt="player-1-icon"
                width={54}
                height={59}
              ></Image>
            </div>
          </div>
          <div className="flex flex-1 justify-end items-end">
            <div className="bshape h-[80px] w-fit px-7 bg-white flex flex-col items-center justify-center relative mr-[27px]">
              <h4>PLAYER&nbsp;2</h4>
              <h3>{score.player2}</h3>
              <Image
                className="absolute bottom-0 top-0 my-auto right-[-27px]"
                src={IconPlayer2}
                alt="player-2-icon"
                width={54}
                height={59}
              ></Image>
            </div>
          </div>
        </div>
        <p className="pb-10"></p>
        <div id="board" className="flex justify-center">
          <div className="w-[335px] h-[310px] relative">
            <BoardInput
              player={game.current.currentPlayer}
              board={game.current.board}
              className="z-50 absolute top-0 w-[335px] h-[310px]"
              onClick={pushToken}
            ></BoardInput>
            <BoardGrid
              value={game.current.board}
              className="absolute top-0 z-20"
            ></BoardGrid>

            <Image
              src={BoardLayerWhiteSmall}
              alt="board-layer-white"
              width={335}
              height={310}
              className="z-40 absolute top-0 bottom-0 m-auto left-0 right-0"
            ></Image>
            <Image
              src={BoardLayerBlackSmall}
              alt="board-layer-white"
              width={335}
              height={310}
              className="absolute z-10 top-0 bottom-[-10px] m-auto left-0 right-0"
            ></Image>
          </div>
        </div>
      </div>
      {game.current.status === Status.RUNNING && (
        <div id="turn-pannel" className="z-30 relative">
          <div
            style={{
              backgroundImage: `url(${
                game.current.currentPlayer == Player.ONE
                  ? TurnBackgroundRed.src
                  : TurnBackgroundYellow.src
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-[196px] h-[164px] pt-10 absolute top-[-20px] m-auto left-0 right-0"
          >
            <h4 className="text-white text-center">
              PLAYER {game.current.currentPlayer}&apos;S TURN
            </h4>
            <p className="pb-3"></p>
            <h1 className="text-white text-center">{counter}s</h1>
          </div>
        </div>
      )}
      {game.current.winner !== null && (
        <div id="winner-pannel" className="z-30 relative">
          <div className="h-fit  w-[285px] pt-10 absolute top-[-70px] m-auto left-0 right-0">
            <div className="z-30 bshape h-full w-full  py-4 px-7 bg-white flex flex-col items-center justify-center relative">
              <h4>PLAYER {game.current.winner}</h4>
              <p className="pb-3"></p>
              <h1>WINS</h1>
              <p className="pb-3"></p>
              <SmallButton onClick={playAgain}>PLAY&nbsp;AGAIN</SmallButton>
            </div>
          </div>
        </div>
      )}

      <footer className="h-full rounded-t-[60px] bg-purple-600 relative z-10"></footer>
    </main>
  );
}
