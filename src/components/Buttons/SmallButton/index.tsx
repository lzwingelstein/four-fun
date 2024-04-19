import clsx from "clsx";

export default function SmallButton({
  className,
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <button
      className={clsx(
        "bg-purple-600 text-white font-bold p-2 px-4 rounded-full flex justify-center items-center w-[108px] h-[39px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
