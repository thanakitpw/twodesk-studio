"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! (demo)");
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const inputClass =
    "w-full border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-[#bbb] focus:border-[#1a1a1a]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="text-[24px] font-bold text-[#1a1a1a]">
        {t("heading")}
      </h2>

      {/* Name + Email row */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex-1">
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
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
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
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
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
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
          <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
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
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-[#999]">
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

      {/* Submit */}
      <button
        type="submit"
        className="self-start bg-black px-10 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#333]"
      >
        {t("submit")}
      </button>
    </form>
  );
}
