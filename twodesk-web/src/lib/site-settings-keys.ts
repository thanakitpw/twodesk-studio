/**
 * key คงที่ของ site_settings — ใช้ร่วมกันทั้ง Pages/Settings editor (เขียน)
 * และหน้า public (อ่าน) เพื่อกัน key พิมพ์ไม่ตรงกัน
 */
export const SETTINGS_KEYS = {
  companyName: 'company_name',
  taglineTh: 'tagline_th',
  taglineEn: 'tagline_en',
  email: 'email',
  phone: 'phone',
  addressTh: 'address_th',
  addressEn: 'address_en',
  instagramUrl: 'instagram_url',
  facebookUrl: 'facebook_url',
  seoTitle: 'seo_title',
  seoDescription: 'seo_description',
  heroTitleTh: 'hero_title_th',
  heroTitleEn: 'hero_title_en',
  heroSubtitleTh: 'hero_subtitle_th',
  heroSubtitleEn: 'hero_subtitle_en',
} as const;

export type SettingsKey = (typeof SETTINGS_KEYS)[keyof typeof SETTINGS_KEYS];
