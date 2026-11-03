import MannaLegal from "../components/manna-legal/MannaLegal"

export const metadata = {
  title: "Manna — Data Deletion",
  description:
    "How to permanently delete your Manna reflections, one at a time or all at once, and exactly what data is deleted versus retained.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/manna-data-deletion",
  },
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to delete your Manna reflections",
  step: [
    { "@type": "HowToStep", text: "Open the Manna app." },
    { "@type": "HowToStep", text: "Go to your History." },
    { "@type": "HowToStep", text: "Open the reflection you want to remove." },
    {
      "@type": "HowToStep",
      text: "Tap Delete and confirm. The reflection is permanently removed from our servers.",
    },
  ],
}

export default function MannaDataDeletion() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <MannaLegal
        eyebrow="Data Deletion"
        title="Remove your reflections"
        meta="App: Manna · Developer: Built by Dustin · Last updated: June 27, 2026"
        lede="Manna is a privacy-first app. It does not require an account — there is no username, email, password, or sign-in. Your reflections (“Pourings”) are encrypted (AES-256) and tied only to an anonymous session on your device."
        contact={
          <>
            <h2>Need help, or want us to delete your data for you?</h2>
            <p>
              Email{" "}
              <a href="mailto:manna@builtbydustin.dev">
                manna@builtbydustin.dev
              </a>{" "}
              with your request. Since reflections are not linked to any
              personal identifier, we may not be able to locate specific entries
              on our own, but we will help you complete deletion from within the
              app.
            </p>
          </>
        }
      >
        <h2>How to delete your reflections</h2>
        <ol>
          <li>Open the Manna app.</li>
          <li>
            Go to your <strong>History</strong>.
          </li>
          <li>Open the reflection you want to remove.</li>
          <li>
            Tap <strong>Delete</strong> and confirm. The reflection is
            permanently removed from our servers.
          </li>
        </ol>
        <p>Repeat for any other reflections you want to delete.</p>

        <h2>Delete everything at once</h2>
        <p>
          Because Manna has no account, you can remove all of your data by{" "}
          <strong>uninstalling the app</strong> (this clears any reflections
          saved only on your device) and deleting your saved reflections from
          History as described above before uninstalling.
        </p>

        <h2>What is deleted and what is kept</h2>
        <ul>
          <li>
            <strong>Deleted:</strong> Your reflection text, the returned verse,
            commentary, and prayer — permanently removed when you delete a
            reflection.
          </li>
          <li>
            <strong>Kept:</strong> Anonymous, non-identifying operational data
            such as aggregate daily usage counts and short-lived rate-limit
            records used to prevent abuse. This data is not linked to you and is
            not personally identifiable. Rate-limit records expire automatically
            within roughly one hour.
          </li>
        </ul>
      </MannaLegal>
    </>
  )
}
