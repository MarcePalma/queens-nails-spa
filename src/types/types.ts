export interface NavLinkProps {
    href: string;
    title: string;
}
export interface MenuOverlayProps {
    title: string;
    path: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    date: string;
    image: string;
    category: string;
  }
export interface Appointment {
    name: string;
    treatment: string;
    date: Date | null;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
    time: string;
  }
  