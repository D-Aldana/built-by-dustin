import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { AppTheme } from "@/components/theme-provider"
import { BlogPost } from "@/components/blog-post"
import { getAllPosts, getPostMeta, getPostSource } from "@/util/blog"

const SITE_URL = "https://www.builtbydustin.dev"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostMeta(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${slug}`

  return {
    title: `${post.title} | Dustin Aldana`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Dustin Aldana Portfolio",
      locale: "en_US",
      type: "article",
      publishedTime: post.date ?? undefined,
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const source = getPostSource(slug)
  const post = getPostMeta(slug)

  if (!source || !post || post.draft) notFound()

  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  })

  const posts = getAllPosts()
  const index = posts.findIndex((entry) => entry.slug === slug)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Dustin Aldana",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${slug}`,
  }

  return (
    <AppTheme>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPost
        post={post}
        next={index > 0 ? posts[index - 1] : null}
        previous={index < posts.length - 1 ? posts[index + 1] : null}
      >
        {content}
      </BlogPost>
    </AppTheme>
  )
}
