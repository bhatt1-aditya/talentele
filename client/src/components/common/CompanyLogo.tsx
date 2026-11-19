import type { ImgHTMLAttributes } from "react";

type CompanyLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  name: string;
};

/**
 * Authentic, official corporate brand vector logos for top employers.
 * Uses official vector assets with exact corporate branding and typography.
 */
export function CompanyLogo({
  name,
  className = "",
  style,
  ...props
}: CompanyLogoProps) {
  const norm = name.trim().toLowerCase();

  let src = "";
  let alt = `${name} logo`;
  let maxHeight = 32;

  if (norm.includes("tcs") || norm.includes("tata")) {
    src = "/images/companies/tcs.svg";
    alt = "Tata Consultancy Services (TCS)";
    maxHeight = 32;
  } else if (norm.includes("infosys")) {
    src = "/images/companies/infosys.svg";
    alt = "Infosys";
    maxHeight = 30;
  } else if (norm.includes("capgemini")) {
    src = "/images/companies/capgemini.svg";
    alt = "Capgemini";
    maxHeight = 28;
  } else if (norm.includes("cognizant")) {
    src = "/images/companies/cognizant.svg";
    alt = "Cognizant";
    maxHeight = 26;
  } else if (norm.includes("tech mahindra") || norm.includes("mahindra")) {
    src = "/images/companies/tech-mahindra.svg";
    alt = "Tech Mahindra";
    maxHeight = 30;
  } else if (norm.includes("wipro")) {
    src = "/images/companies/wipro.svg";
    alt = "Wipro";
    maxHeight = 38;
  } else if (norm.includes("genpact")) {
    src = "/images/companies/genpact.svg";
    alt = "Genpact";
    maxHeight = 26;
  } else if (norm.includes("accenture")) {
    src = "/images/companies/accenture.svg";
    alt = "Accenture";
    maxHeight = 28;
  } else if (norm.includes("deloitte")) {
    src = "/images/companies/deloitte.svg";
    alt = "Deloitte";
    maxHeight = 24;
  } else if (norm.includes("pwc") || norm.includes("pricewaterhouse")) {
    src = "/images/companies/pwc.svg";
    alt = "PricewaterhouseCoopers (PwC)";
    maxHeight = 38;
  }

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`company-logo-img ${className}`.trim()}
        style={{
          maxHeight: `${maxHeight}px`,
          maxWidth: "125px",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <span
      className={`company-logo-fallback ${className}`.trim()}
      style={{
        fontWeight: 700,
        fontSize: "14px",
        color: "#1E293B",
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {name}
    </span>
  );
}
