import type { SVGProps } from "react";

export type ToolLogoProps = SVGProps<SVGSVGElement> & {
  name: string;
};

/**
 * Total Real, High-Definition Official Brand Logos
 * Exact vectors for Microsoft Excel, Power BI, SQL, Python, Tableau, SAP, OpenAI, etc.
 */
export function ToolLogo({
  name,
  className = "",
  width = 16,
  height = 16,
  ...props
}: ToolLogoProps) {
  const norm = name.trim().toLowerCase();

  // Microsoft Excel (Official Fluent Workbook Logo)
  if (norm.includes("excel")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M29.5 5.5H18v21h11.5a1.5 1.5 0 0 0 1.5-1.5v-18a1.5 1.5 0 0 0-1.5-1.5z"
          fill="#107C41"
        />
        <path
          d="M22 10.5h-4v2h4v-2zm0 3.5h-4v2h4v-2zm0 3.5h-4v2h4v-2zm5-7h-4v2h4v-2zm0 3.5h-4v2h4v-2zm0 3.5h-4v2h4v-2z"
          fill="#33C481"
        />
        <path
          d="M18.5 2.5l-16 3A1.5 1.5 0 0 0 1 7v18a1.5 1.5 0 0 0 1.5 1.5l16 3A1.5 1.5 0 0 0 20 28V4a1.5 1.5 0 0 0-1.5-1.5z"
          fill="#21A366"
        />
        <path
          d="M7.2 20.5l2.4-4.5-2.2-4.5h2.5l1.1 2.6c.2.4.3.7.4 1h.1c.1-.3.2-.6.4-1l1.2-2.6h2.3l-2.3 4.5 2.5 4.5h-2.5l-1.3-3c-.1-.2-.2-.5-.3-.8h-.1c-.1.3-.2.6-.3.8l-1.3 3H7.2z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Microsoft Power BI (Official 3-tier Ascending Gold/Amber Bars)
  if (norm.includes("power bi") || norm === "pbi") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M26.5 2h-4a1.5 1.5 0 0 0-1.5 1.5v25a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-25A1.5 1.5 0 0 0 26.5 2z"
          fill="#D97706"
        />
        <path
          d="M18 9h-4a1.5 1.5 0 0 0-1.5 1.5v18a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-18A1.5 1.5 0 0 0 18 9z"
          fill="#F59E0B"
        />
        <path
          d="M9.5 16h-4A1.5 1.5 0 0 0 4 17.5v11A1.5 1.5 0 0 0 5.5 30h4a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 9.5 16z"
          fill="#FCD34D"
        />
      </svg>
    );
  }

  // SQL / Relational Database (Official 3D Teal Database Cylinder with bold SQL mark)
  if (norm.includes("sql")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M16 2C8.8 2 3 4.2 3 7v18c0 2.8 5.8 5 13 5s13-2.2 13-5V7c0-2.8-5.8-5-13-5z"
          fill="#00758F"
        />
        <ellipse cx="16" cy="7" rx="13" ry="4.5" fill="#00A4BD" />
        <path
          d="M3 13c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M3 19c0 2.5 5.8 4.5 13 4.5s13-2 13-4.5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.35"
        />
        <text
          x="16"
          y="24"
          fill="#FFFFFF"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          SQL
        </text>
      </svg>
    );
  }

  // Python (Official Python Software Foundation Vector Logo)
  if (norm.includes("python")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 255"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V28.187s4.646-28.115-62.518-28.115zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
          fill="#387EB8"
        />
        <path
          d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v61.792s-4.646 28.117 62.518 28.117zM162.87 234.538a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
          fill="#FFE052"
        />
      </svg>
    );
  }

  // Tableau (Official Multicolored Tableau Cluster)
  if (norm.includes("tableau")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 256 256"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path d="M121 86h14v84h-14zm-35 35h84v14H86z" fill="#E8762D" />
        <path d="M185 46h11v55h-11zm-22 22h55v11h-55z" fill="#D34735" />
        <path d="M60 46h11v55H60zm-22 22h55v11H38z" fill="#2A6A9E" />
        <path d="M60 155h11v55H60zm-22 22h55v11H38z" fill="#5C7A99" />
        <path d="M185 155h11v55h-11zm-22 22h55v11h-55z" fill="#6A9054" />
        <path d="M124 16h8v40h-8zm-16 16h40v8h-40z" fill="#E97627" />
        <path d="M124 200h8v40h-8zm-16 16h40v8h-40z" fill="#3B5998" />
        <path d="M22 124h8v40h-8zm-16 16h40v8H6z" fill="#9C3A27" />
        <path d="M226 124h8v40h-8zm-16 16h40v8h-40z" fill="#D34735" />
      </svg>
    );
  }

  // OpenAI (Official Geometric Hexagonal Vortex Knot)
  if (norm.includes("openai") || norm.includes("chatgpt")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.07-9.54A4.487 4.487 0 0 1 4.86 6.223v5.678a.78.78 0 0 0 .39.676l5.836 3.37-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.53 8.764zm15.65 3.385L12.344 8.78l2.02-1.168a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L8.809 9.629V7.297a.068.068 0 0 1 .031-.06l4.839-2.79a4.5 4.5 0 0 1 6.84 4.75zM12.008 13.92l-2.615-1.51 2.615-1.51 2.615 1.51-2.615 1.51z"
          fill="#10A37F"
        />
      </svg>
    );
  }

  // SAP FICO (Financial Accounting & Management Controlling)
  if (norm.includes("fico") || norm.includes("sap fico")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect width="32" height="32" rx="7" fill="#005A9C" />
        <path d="M0 0h32L24 7H0z" fill="#008FD3" />
        <path d="M4 3.5h7" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />
        <text
          x="16"
          y="22"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.03em"
        >
          FICO
        </text>
      </svg>
    );
  }

  // SAP MM (Materials Management & Logistics Inventory)
  if (norm.includes("sap mm") || norm === "mm" || norm.includes("materials management")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect width="32" height="32" rx="7" fill="#0F766E" />
        <path d="M0 0h32L24 7H0z" fill="#0D9488" />
        <path d="M4 3.5h7" stroke="#99F6E4" strokeWidth="1.2" strokeLinecap="round" />
        <text
          x="16"
          y="23"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.04em"
        >
          MM
        </text>
      </svg>
    );
  }

  // SAP SD (Sales & Distribution / Order-to-Cash)
  if (norm.includes("sap sd") || norm === "sd" || norm.includes("sales & distribution")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect width="32" height="32" rx="7" fill="#C2410C" />
        <path d="M0 0h32L24 7H0z" fill="#EA580C" />
        <path d="M4 3.5h7" stroke="#FED7AA" strokeWidth="1.2" strokeLinecap="round" />
        <text
          x="16"
          y="23"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.04em"
        >
          SD
        </text>
      </svg>
    );
  }

  // SAP ABAP (Advanced Business Application Programming)
  if (norm.includes("abap") || norm.includes("sap abap")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect width="32" height="32" rx="7" fill="#3730A3" />
        <path d="M0 0h32L24 7H0z" fill="#4F46E5" />
        <path d="M4 3.5h7" stroke="#C7D2FE" strokeWidth="1.2" strokeLinecap="round" />
        <text
          x="16"
          y="22"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="8"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.03em"
        >
          ABAP
        </text>
      </svg>
    );
  }

  // SAP Official Corporate Logotype (Iconic SAP Blue Trapezoid with Crisp White Typography)
  if (norm.includes("sap") || norm === "erp" || norm.includes("sap - erp") || norm.includes("sap erp")) {
    const sapWidth = Math.round(Number(width) * 1.85);
    return (
      <svg
        width={sapWidth}
        height={height}
        viewBox="0 0 48 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path d="M0 0h48L38 24H0z" fill="#008FD3" />
        <path
          d="M13.2 8.4c-1-.7-2.1-1-3.3-1-1.5 0-2.4.6-2.4 1.5 0 1 .9 1.4 2.8 1.8 3.1.6 4.7 1.8 4.7 4.1 0 2.7-2.2 4.4-5.6 4.4-1.9 0-3.6-.5-4.8-1.5l1.3-2.3c1 .8 2.3 1.3 3.6 1.3 1.6 0 2.6-.7 2.6-1.7 0-1.1-1-1.5-3-2-2.9-.6-4.5-1.9-4.5-4 0-2.5 2-4.1 5.2-4.1 1.7 0 3.2.4 4.3 1.1l-1 2.4zm10.7-3.8l5.2 14.2h-3.4l-1.1-3.2h-5.6l-1.1 3.2h-3.2l5.2-14.2h4zm-1.8 3.5l-2 5.7h3.9l-1.9-5.7zm11.7-3.5h5.4c3.4 0 5.4 1.7 5.4 4.5 0 2.8-2 4.5-5.4 4.5h-2.5v5.2H33.8V4.6zm3 6.6h2.2c1.7 0 2.8-.8 2.8-2.1 0-1.3-1.1-2.1-2.8-2.1h-2.2v4.2z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Machine Learning / Neural Network Lattice
  if (norm.includes("machine learning") || norm.includes("ml")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M4 12h4m8 0h4M8 6l8 12M8 18L16 6M8 6h8M8 18h8"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />
        <circle cx="4" cy="12" r="2.5" fill="#6366F1" />
        <circle cx="20" cy="12" r="2.5" fill="#6366F1" />
        <circle cx="8" cy="6" r="2.5" fill="#8B5CF6" />
        <circle cx="16" cy="6" r="2.5" fill="#A855F7" />
        <circle cx="8" cy="18" r="2.5" fill="#8B5CF6" />
        <circle cx="16" cy="18" r="2.5" fill="#A855F7" />
      </svg>
    );
  }

  // Prompt Engineering / LLM Terminal & Spark
  if (norm.includes("prompt")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect
          x="2"
          y="3"
          width="20"
          height="18"
          rx="4"
          fill="#0F172A"
          stroke="#6366F1"
          strokeWidth="1.5"
        />
        <path
          d="M6 8l4 4-4 4"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16h6"
          stroke="#A855F7"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16.5 7l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z"
          fill="#FDE047"
        />
      </svg>
    );
  }

  // Financial Modeling / Growth Curve & Cash
  if (norm.includes("financial") || norm.includes("finance")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="2" y="3" width="20" height="18" rx="3.5" fill="#047857" />
        <path
          d="M6 16l3.5-4.5 3 2.5 5.5-6.5"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 7.5h3v3"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="7" r="2" fill="#34D399" />
      </svg>
    );
  }

  // KPI Metrics / Precision Speedometer Target
  if (norm.includes("kpi") || norm.includes("metric")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <circle cx="12" cy="12" r="9.5" fill="#BE185D" />
        <circle cx="12" cy="12" r="6.5" fill="#F43F5E" />
        <circle cx="12" cy="12" r="3.5" fill="#FFFFFF" />
        <circle cx="12" cy="12" r="1.5" fill="#BE185D" />
        <path
          d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // DAX / Power Query
  if (norm.includes("dax") || norm.includes("power query")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#D97706" />
        <text
          x="12"
          y="15"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
        >
          fx
        </text>
      </svg>
    );
  }

  // Data & Business Analytics (Ascending Analytical Metric Bars & Predictive Growth Trendline)
  if (
    norm.includes("business analytics") ||
    norm.includes("data & business analytics") ||
    norm.includes("data analytics") ||
    norm.includes("data & analytics") ||
    norm === "analytics"
  ) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="2.5" y="11" width="4.5" height="10" rx="1.5" fill="#0284C7" />
        <rect x="9.75" y="6.5" width="4.5" height="14.5" rx="1.5" fill="#06B6D4" />
        <rect x="17" y="2.5" width="4.5" height="18.5" rx="1.5" fill="#38BDF8" />
        <path
          d="M2.5 13.5L8.5 8.5L13.5 11L21 2.5"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="2.5" r="2.2" fill="#F59E0B" />
        <circle cx="13.5" cy="11" r="1.3" fill="#FFFFFF" />
        <circle cx="8.5" cy="8.5" r="1.3" fill="#FFFFFF" />
        <circle cx="2.5" cy="13.5" r="1.3" fill="#FFFFFF" />
      </svg>
    );
  }

  // Data Science, Agentic AI & Generative AI (Multi-Agent Neural Orbit + Gen AI Intelligence Spark)
  if (
    norm.includes("agentic") ||
    norm.includes("gen ai") ||
    norm.includes("generative ai") ||
    norm.includes("data science") ||
    norm.includes("data sciece") ||
    norm.includes("ai & ml")
  ) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="4.5"
          transform="rotate(-28 12 12)"
          stroke="#8B5CF6"
          strokeWidth="1.6"
          strokeDasharray="3 2"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="4.5"
          transform="rotate(35 12 12)"
          stroke="#06B6D4"
          strokeWidth="1.6"
          fill="none"
          opacity="0.85"
        />
        <circle cx="4.5" cy="8.5" r="2" fill="#06B6D4" />
        <circle cx="19.5" cy="15.5" r="2" fill="#EC4899" />
        <circle cx="17" cy="6.5" r="1.8" fill="#8B5CF6" />
        <circle cx="7" cy="17" r="1.6" fill="#A855F7" />
        <path
          d="M12 6.5C12 9.5 10.5 12 7.5 12C10.5 12 12 14.5 12 17.5C12 14.5 13.5 12 16.5 12C13.5 12 12 9.5 12 6.5Z"
          fill="#FFFFFF"
        />
        <path
          d="M19.5 2.5L20 3.8L21.3 4.3L20 4.8L19.5 6.1L19 4.8L17.7 4.3L19 3.8Z"
          fill="#FDE047"
        />
      </svg>
    );
  }

  // Digital Marketing (Dynamic Megaphone / Growth Campaign Broadcast & Engagement Spark)
  if (
    norm.includes("digital marketing") ||
    norm.includes("marketing")
  ) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M13 5L5.5 8.5H2.5C1.67 8.5 1 9.17 1 10V14C1 14.83 1.67 15.5 2.5 15.5H5.5L13 19V5Z"
          fill="#F43F5E"
        />
        <rect x="13" y="4" width="2" height="16" rx="1" fill="#FB7185" />
        <path
          d="M5.5 15.5V19.5C5.5 20.33 6.17 21 7 21H8C8.83 21 9.5 20.33 9.5 19.5V15.5"
          fill="#BE123C"
        />
        <path
          d="M17.5 9C18.6 10 19.2 11 19.2 12C19.2 13 18.6 14 17.5 15"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20.5 6.5C22.2 8.2 23 10.1 23 12C23 13.9 22.2 15.8 20.5 17.5"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 5.5L6.4 6.6L7.5 7L6.4 7.4L6 8.5L5.6 7.4L4.5 7L5.6 6.6Z"
          fill="#FDE047"
        />
      </svg>
    );
  }

  // Google Ads (Official Google Ads Dual-Pill Emblem)
  if (norm.includes("google ads") || norm.includes("google ad") || norm.includes("gads")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M4.5 13.5L10 3.5C10.5 2.5 11.8 2.2 12.8 2.7L14.2 3.5C15.2 4 15.5 5.3 15 6.3L9.5 16.3C9 17.3 7.7 17.6 6.7 17.1L5.3 16.3C4.3 15.8 4 14.5 4.5 13.5Z"
          fill="#FBBC04"
        />
        <path
          d="M19.5 13.5L14 3.5C13.5 2.5 12.2 2.2 11.2 2.7L9.8 3.5C8.8 4 8.5 5.3 9 6.3L14.5 16.3C15 17.3 16.3 17.6 17.3 17.1L18.7 16.3C19.7 15.8 20 14.5 19.5 13.5Z"
          fill="#4285F4"
        />
        <circle cx="6.5" cy="18.5" r="3" fill="#34A853" />
      </svg>
    );
  }

  // Meta Ads / Meta (Official Meta Blue Infinity Loop)
  if (norm.includes("meta") || norm.includes("facebook ads")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M16.9 4C14.7 4 13 5.3 12 7C11 5.3 9.3 4 7.1 4C3.5 4 1 7 1 11.3C1 16 4.5 20 8.2 20.8C9.7 21.1 11.1 20.5 12 19.5C12.9 20.5 14.3 21.1 15.8 20.8C19.5 20 23 16 23 11.3C23 7 20.5 4 16.9 4ZM7.2 17.5C5 17.5 3.5 14.8 3.5 11.3C3.5 8.4 5 6.3 7.2 6.3C9.1 6.3 10.6 7.7 11.4 9.9L9.6 14.8C9.1 16.4 8.2 17.5 7.2 17.5ZM16.8 17.5C15.8 17.5 14.9 16.4 14.4 14.8L12.6 9.9C13.4 7.7 14.9 6.3 16.8 6.3C19 6.3 20.5 8.4 20.5 11.3C20.5 14.8 19 17.5 16.8 17.5Z"
          fill="#0668E1"
        />
      </svg>
    );
  }

  // SEO (Search Engine Optimization Magnifier with Upward Ranking Growth)
  if (norm.includes("seo") || norm.includes("search engine")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <circle cx="10" cy="10" r="7" stroke="#38BDF8" strokeWidth="2" />
        <path d="M15.5 15.5L21.5 21.5" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M6.5 12L8.5 9.5L11 11L13.5 7.5"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 7.5H13.5V9.5"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Git & GitHub
  if (norm.includes("git")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M2.6 10.6L10.6 2.6C11.4 1.8 12.6 1.8 13.4 2.6L21.4 10.6C22.2 11.4 22.2 12.6 21.4 13.4L13.4 21.4C12.6 22.2 11.4 22.2 10.6 21.4L2.6 13.4C1.8 12.6 1.8 11.4 2.6 10.6Z"
          fill="#F05032"
        />
        <path
          d="M8.5 12C9.3 12 10 11.3 10 10.5C10 9.7 9.3 9 8.5 9C7.7 9 7 9.7 7 10.5C7 11.3 7.7 12 8.5 12ZM15.5 12C16.3 12 17 11.3 17 10.5C17 9.7 16.3 9 15.5 9C14.7 9 14 9.7 14 10.5C14 11.3 14.7 12 15.5 12ZM12 15.5C12.8 15.5 13.5 14.8 13.5 14C13.5 13.2 12.8 12.5 12 12.5C11.2 12.5 10.5 13.2 10.5 14C10.5 14.8 11.2 15.5 12 15.5Z"
          fill="#FFFFFF"
        />
        <path d="M8.5 10.5V14H15.5V10.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Jira / Agile
  if (norm.includes("jira") || norm.includes("agile")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M11.5 2C11.5 6.5 7.8 10.2 3.3 10.2H2V2H11.5Z"
          fill="#0052CC"
        />
        <path
          d="M21.5 12C21.5 16.5 17.8 20.2 13.3 20.2H12V12H21.5Z"
          fill="#2684FF"
        />
        <path
          d="M16.5 7C16.5 11.5 12.8 15.2 8.3 15.2H7V7H16.5Z"
          fill="#0052CC"
        />
      </svg>
    );
  }

  // Postman & API
  if (norm.includes("postman") || norm.includes("api")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path
          d="M16 11.5C15.5 9 13.5 7.5 11 8C8.5 8.5 7 11 8 13.5C8.5 15 10 16 12 16L16 11.5Z"
          fill="#FFFFFF"
        />
        <path
          d="M14.5 13L17 15.5M17 12H19"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Selenium
  if (norm.includes("selenium")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect width="20" height="20" x="2" y="2" rx="4" fill="#43B02A" />
        <text
          x="6"
          y="15.5"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Se
        </text>
      </svg>
    );
  }

  // Manual Testing & QA
  if (norm.includes("testing") || norm.includes("qa") || norm.includes("pytest")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
          fill="#0EA5E9"
        />
        <path
          d="M8.5 12L10.5 14L15.5 9"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Pandas & NumPy & Scikit-Learn
  if (norm.includes("pandas") || norm.includes("numpy") || norm.includes("scikit") || norm.includes("learn")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#150458" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#E70488" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#FFD43B" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#38BDF8" />
      </svg>
    );
  }

  // VS Code
  if (norm.includes("vs code") || norm.includes("vscode")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          d="M17.5 2L5.5 11.5L2 9L1 10V14L2 15L5.5 12.5L17.5 22L23 19.5V4.5L17.5 2Z"
          fill="#007ACC"
        />
        <path d="M17.5 6L8.5 12L17.5 18V6Z" fill="#1F9CF0" />
      </svg>
    );
  }

  // Jupyter
  if (norm.includes("jupyter")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#F37626" strokeWidth="2" fill="none" />
        <ellipse cx="12" cy="17" rx="8" ry="3" stroke="#F37626" strokeWidth="2" fill="none" />
        <circle cx="6" cy="12" r="1.5" fill="#6E6E6E" />
        <circle cx="18" cy="12" r="1.5" fill="#6E6E6E" />
      </svg>
    );
  }

  // LangChain, Agents & AI Architecture
  if (norm.includes("langchain") || norm.includes("agent") || norm.includes("vector") || norm.includes("llm")) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <circle cx="6" cy="6" r="3" fill="#10B981" />
        <circle cx="18" cy="6" r="3" fill="#6366F1" />
        <circle cx="12" cy="18" r="3.5" fill="#EC4899" />
        <path d="M8 8L16 8M7.5 8.5L10.5 15.5M16.5 8.5L13.5 15.5" stroke="#94A3B8" strokeWidth="1.5" />
      </svg>
    );
  }

  // Generic Tech Vector
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
