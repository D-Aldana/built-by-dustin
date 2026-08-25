import fs from "node:fs"
import path from "node:path"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 220

/* Frontmatter here is ours, not user input, so a few lines beat a YAML
   dependency. Handles `key: value`, quoted values, and inline arrays. */
const parseFrontmatter = (raw) => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line.trim())
    if (!pair) continue

    const [, key, rawValue] = pair
    const unquote = (value) => value.trim().replace(/^["']|["']$/g, "")

    if (rawValue.startsWith("[")) {
      data[key] = rawValue
        .slice(1, rawValue.lastIndexOf("]"))
        .split(",")
        .map(unquote)
        .filter(Boolean)
    } else if (rawValue === "true" || rawValue === "false") {
      data[key] = rawValue === "true"
    } else {
      data[key] = unquote(rawValue)
    }
  }

  return { data, body: raw.slice(match[0].length) }
}

const readingTime = (body) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / WORDS_PER_MINUTE))

export const formatPostDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })

/* The featured card sets its meta in condensed caps, where "August 26, 2026"
   runs too long for a stat cell. */
export const formatPostDateShort = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })

export const getPostSlugs = () =>
  fs.existsSync(BLOG_DIR)
    ? fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""))
    : []

export const getPostSource = (slug) => {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null
}

export const getPostMeta = (slug) => {
  const source = getPostSource(slug)
  if (!source) return null

  const { data, body } = parseFrontmatter(source)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? null,
    dateLabel: data.date ? formatPostDate(data.date) : null,
    dateLabelShort: data.date ? formatPostDateShort(data.date) : null,
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    draft: data.draft === true,
    readingTimeMinutes: Number(data.readingTimeMinutes) || readingTime(body),
  }
}

export const getAllPosts = ({ limit } = {}) => {
  const posts = getPostSlugs()
    .map(getPostMeta)
    .filter((post) => post && !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return limit ? posts.slice(0, limit) : posts
}
