import Link from "next/link";

import { ChevronRight } from "@/components/common/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utilities";

type BreadcrumbsProps = { items: Crumb[]; tone?: "light" | "dark" };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. Include Home as the first item. */
export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", tone === "dark" ? "text-muted-dark" : "text-muted")}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className={cn("underline-offset-4 hover:underline", tone === "dark" ? "hover:text-white" : "hover:text-ink")}
                    >
                      {item.name}
                    </Link>
                    <ChevronRight width={14} height={14} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
