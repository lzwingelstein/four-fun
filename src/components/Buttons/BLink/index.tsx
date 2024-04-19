import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function BLink({
  className,
  text,
  icon,
  href,
}: Readonly<{
  className?: string;
  href: string;
  text: string;
  icon?: string | StaticImport;
}>) {
  const minify = (it: string) => it.replace(/\s+/g, "");
  return (
    <Link
      href={href}
      className={clsx(
        "bshape text-black font-bold py-2 px-4 flex justify-between items-center w-[335px] h-[72px] mb-2",
        className
      )}
    >
      <h2>{text}</h2>
      {!!icon && (
        <Image src={icon} alt={`${minify(text)}-icon`} width={76} height={40} />
      )}
    </Link>
  );
}
