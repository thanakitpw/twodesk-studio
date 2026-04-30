"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const isTh = locale === "th";
  const labelClass = `mb-2 block text-[#999] ${isTh ? "th-eyebrow" : "text-xs font-medium uppercase tracking-[0.1em]"}`;
  const fieldClass = `${isTh ? "th-body-sm" : "text-sm"}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] outline-none transition-colors placeholder:text-[#bbb] focus:border-[#1a1a1a] ${fieldClass}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className={`mb-2 text-[#1a1a1a] ${isTh ? "" : "text-[24px] font-bold md:text-[28px]"}`}>
        {t("heading")}
      </h2>

      {/* Name + Email row */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          <label className={labelClass}>
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("namePlaceholder")}
            className={inputClass}
            required
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>
            {t("email")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Phone + Project Type row */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          <label className={labelClass}>
            {t("phone")}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("phonePlaceholder")}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className={labelClass}>
            {t("projectType")}
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10`}
            required
          >
            <option value="" disabled>
              {t("projectTypePlaceholder")}
            </option>
            <option value="commercial">{t("projectTypes.commercial")}</option>
            <option value="cafe">{t("projectTypes.cafe")}</option>
            <option value="residential">{t("projectTypes.residential")}</option>
            <option value="others">{t("projectTypes.others")}</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>
          {t("message")}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("messagePlaceholder")}
          rows={6}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      {/* Status Messages */}
      {success && (
        <p className="text-sm text-green-700">{t("successMessage")}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className={`w-full bg-black px-10 py-3.5 text-white transition-colors hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start ${isTh ? "th-button" : "text-sm font-medium"}`}
      >
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
