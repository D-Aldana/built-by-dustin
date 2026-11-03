import { AppTheme } from "@/components/theme-provider"
import { BlogPage } from "@/components/blog-page"
import { getAllPosts } from "@/util/blog"

export const metadata = {
  title: "Writing | Dustin Aldana",
  description:
    "Notes from Dustin Aldana on building software — product decisions, lessons from shipping, and the craft behind the code.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/blog",
  },
  openGraph: {
    title: "Writing | Dustin Aldana",
    description:
      "Notes from Dustin Aldana on building software — product decisions, lessons from shipping, and the craft behind the code.",
    url: "https://www.builtbydustin.dev/blog",
    siteName: "Dustin Aldana Portfolio",
    locale: "en_US",
    type: "website",
  },
}

export default function Blog() {
  return (
    <AppTheme>
      <BlogPage posts={getAllPosts()} />
    </AppTheme>
  )
}
