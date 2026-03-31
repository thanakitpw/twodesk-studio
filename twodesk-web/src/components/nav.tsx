"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 bg-white/95 backdrop-blur-[10px] transition-all duration-300">
        <div className={`mx-auto max-w-[1440px] flex items-center justify-between px-5 md:px-20 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
          <Link href="/" className="flex items-center">
            <img
              src="/logo-full.svg"
              alt="TWO DESKS"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-4 md:h-5" : "h-5 md:h-6"}`}
            />
          </Link>

          {/* Desktop links */}
          <div
            className={`hidden md:flex items-center gap-8 transition-all duration-300 ${locale === "th" ? "font-medium" : "font-light"}`}
            style={{
              fontSize: locale === "th" ? (scrolled ? "18px" : "20px") : (scrolled ? "12px" : "14px"),
              ...(locale === "th" ? { fontWeight: 500 } : {}),
            }}
          >
            {[
              { href: "/projects" as const, label: t("projects") },
              { href: "/blog" as const, label: t("blog") },
              { href: "/about" as const, label: t("about") },
              { href: "/contact" as const, label: t("contact") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 transition-opacity hover:opacity-80 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#1a1a1a] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
            <span className="text-[#999] font-light">
              <span className="text-[#ccc] cursor-not-allowed opacity-50" title="Coming soon">
                TH
              </span>
              {" "}
              <button
                onClick={() => switchLocale("en")}
                className={`${
                  locale === "en"
                    ? "text-[#1a1a1a] font-semibold"
                    : "text-[#999]"
                } hover:opacity-60 transition-opacity cursor-pointer`}
              >
                EN
              </button>
            </span>
          </div>

          {/* Hamburger button - mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute top-0 left-0 right-0 bg-white animate-in slide-in-from-top duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo-full.svg" alt="TWO DESKS" className="h-9 w-auto" />
              </Link>
              <button
                className="flex items-center justify-center w-10 h-10 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col px-5 pb-8 gap-1">
              <Link
                href="/projects"
                className="py-3 text-lg font-light border-b border-[#f0f0f0] hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("projects")}
              </Link>
              <Link
                href="/blog"
                className="py-3 text-lg font-light border-b border-[#f0f0f0] hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("blog")}
              </Link>
              <Link
                href="/about"
                className="py-3 text-lg font-light border-b border-[#f0f0f0] hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="py-3 text-lg font-light border-b border-[#f0f0f0] hover:opacity-60 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>

              {/* Language switcher */}
              <div className="flex gap-4 pt-4 text-sm">
                <span className="text-[#ccc] cursor-not-allowed opacity-50" title="Coming soon">
                  TH
                </span>
                <button
                  onClick={() => {
                    switchLocale("en");
                    setMobileMenuOpen(false);
                  }}
                  className={`${
                    locale === "en"
                      ? "text-[#1a1a1a] font-semibold"
                      : "text-[#999]"
                  } hover:opacity-60 transition-opacity cursor-pointer`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
