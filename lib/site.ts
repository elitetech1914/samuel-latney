import type { Metadata } from "next";

// Add confirmed product URLs here. Empty URLs display an honest “Coming soon” state.
export const retailers = [
  { name: "Amazon Books", image: "/platforms/amazonbooks.webp", href: "" },
  { name: "Barnes & Noble", image: "/platforms/barnesandnoble.webp", href: "" },
  { name: "Books-A-Million", image: "/platforms/bam.webp", href: "" },
  { name: "Walmart", image: "/platforms/wallmart.webp", href: "" },
  { name: "Kobo", image: "/platforms/kobo.png", href: "" },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Samuel", href: "/about" },
  { label: "The Book", href: "/paired-by-providence" },
  { label: "Alice & James", href: "/alice-and-james" },
  { label: "Contact", href: "/contact" },
];

export const images = {
  author: "/author/Suave Portrait at a Golden Celebration.png",
  hero: "/images/Home Hero—Sunset Future.png",
  cover: "/book-mockup/mockup 26.png",
  books: "/book-mockup/mockup 23.png",
  classroom: "/images/The Classroom — The Beginning.png",
  river: "/images/The River Project — Friendship Growing.png",
  dusk: "/images/The River at Dusk — Conversation.png",
  alice: "/images/Alice Character Portrait.png",
  james: "/images/James Character Portrait.png",
  coffee: "/images/Graduation Coffee — Missing What Changed.png",
  drive: "/images/Seven Hundred Miles — The Drive.png",
  beach: "/images/image-2.png",
  reading: "/images/image-5.png",
  shore: "/images/image-6.png",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title,
    description,
    ...(siteUrl
      ? { alternates: { canonical: new URL(path, siteUrl).toString() } }
      : {}),
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: images.hero,
          width: 1916,
          height: 821,
          alt: "Paired by Providence — a novel by Samuel Latney",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images.hero],
    },
  };
}

export const contactEnabled = Boolean(process.env.CONTACT_WEBHOOK_URL);
export const newsletterEnabled = Boolean(process.env.NEWSLETTER_WEBHOOK_URL);
