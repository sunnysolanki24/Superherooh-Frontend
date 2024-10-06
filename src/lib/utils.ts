import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface IPartner {
  partner_id: number;
  partner_name: string;
  description: string;
  services: string;
  country: string;
  state_province: string;
  city_dma: string;
  formats: string;
  addresses: [
    {
      address_country: string;
      address_state: string;
      address_street: string;
      address_city: string;
      address_zip_code: string;
    },
  ];
  contacts: [
    {
      contact_name: string;
      contact_email: string;
      contact_phone: string;
    },
  ];
  websites: [
    {
      website_url: string;
      verified: boolean;
    },
  ];
}
