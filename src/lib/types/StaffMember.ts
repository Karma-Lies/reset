import type { SocialLink } from './SocialLink';

export interface StaffMember {
  id: number;
  name: string;
  pronouns: string;
  role: string;
  profilePicture: {
    url: string;
    width: number;
    height: number;
  };
  socialLinks: SocialLink[];
}