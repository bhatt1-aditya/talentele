import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * Official Talentele wordmark and brand logo mark.
 */
export function Logo({ className = "h-9 w-auto md:h-10", priority = false }: LogoProps) {
  return (
    <Link href="/" aria-label="Talentele home" className="site-logo inline-flex shrink-0 items-center">
      <Image
        src="/brand/logo.png"
        alt="Talentele"
        width={160}
        height={41}
        priority={priority}
        className={className}
        style={{ width: "auto", height: "38px", objectFit: "contain" }}
      />
    </Link>
  );
}

export default Logo;
