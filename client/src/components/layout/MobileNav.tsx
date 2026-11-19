"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { buttonClasses } from "@/components/common/Button";
import { Close, Mail, Menu, Phone } from "@/components/common/Icons";
import { isActivePath } from "@/components/layout/NavLinks";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utilities";

export function MobileNav() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // The menu is tied to the path it was opened on, so navigating closes it.
  const open = openPath === pathname;
  const close = () => setOpenPath(null);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the menu (and its toggle) while it is open.
      const focusable = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpenPath(open ? null : pathname)}
        className="relative z-50 grid size-11 place-items-center rounded-[var(--radius-md)] border border-line text-ink hover:bg-mist"
      >
        {open ? <Close /> : <Menu />}
      </button>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto border-t border-line bg-white"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-6">
          <ul className="divide-y divide-line">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between font-display text-2xl font-bold",
                      active ? "text-brand" : "text-ink",
                    )}
                  >
                    {item.label}
                    {active && <span className="size-2 rounded-full bg-brand" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 space-y-3">
            <Link href="/contact-us/" onClick={close} className={buttonClasses("primary", "lg", "w-full")}>
              Get course guidance
            </Link>
            <a href={site.phone.href} className="flex min-h-11 items-center gap-3 text-muted">
              <Phone width={18} height={18} /> {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 text-muted">
              <Mail width={18} height={18} /> {site.email}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
