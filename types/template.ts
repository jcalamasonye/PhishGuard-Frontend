export type TemplateDifficulty = 'easy' | 'medium' | 'hard';
export type TemplateCategory = 'password' | 'package' | 'executive' | 'payroll' | 'security' | 'vendor' | 'hr' | 'social' | 'bank' | 'it';
export type TemplateType = 'phishing' | 'system';


export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: TemplateDifficulty;
  icon: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  body: string;
  ctaText: string;
  redFlags: string[];
  category: TemplateCategory;
}


export interface UserEmailTemplate {
  id: string;
  name: string;
  category: TemplateType;
  icon: string;
  from: string;
  fromEmail: string;
  subject: string;
  body: string;
  buttonText?: string;
  buttonLink?: string;
  footerText: string;
  footerLinks?: {
    text: string;
    url: string;
  }[];
  footerCompany?: string;
  footerCopyright?: string;
}