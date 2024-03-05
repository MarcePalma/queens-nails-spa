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
    date: Date;
    image: string;
    category: string;
}