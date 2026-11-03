import MannaLegal from "../components/manna-legal/MannaLegal"

export const metadata = {
  title: "Manna — Support",
  description:
    "Support and FAQs for Manna, an AI-guided scriptural reflection app: how it works, privacy, saving and deleting reflections, voice input, and how to get help.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/manna-support",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Manna uses an anonymous session with no username, email, or password. Nothing you write is linked to your identity.",
      },
    },
    {
      "@type": "Question",
      name: "Are my reflections private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Reflections you save are encrypted with AES-256 before they leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I save or revisit a reflection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose to save a reflection after it's returned, and find it later in the History view.",
      },
    },
    {
      "@type": "Question",
      name: "How do I delete a reflection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the History view and delete any reflection permanently. Uninstalling the app also removes reflections stored on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can dictate a reflection using your device's speech recognition. Manna prefers on-device recognition and never stores audio recordings.",
      },
    },
    {
      "@type": "Question",
      name: "Which Bible translation does Manna use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Berean Standard Bible (BSB).",
      },
    },
    {
      "@type": "Question",
      name: "Can I support Manna?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — an optional support link opens Ko-fi in your browser. Donations are entirely optional and never required to use the app.",
      },
    },
  ],
}

export default function MannaSupport() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MannaLegal
        eyebrow="Support"
        title="We're here to help"
        meta="App: Manna · Developer: Built by Dustin"
        lede="Manna is a private space for Christians to process their thoughts through AI-guided scriptural reflection. If something isn't working or you have a question, we'd love to hear from you."
        contact={
          <>
            <h2>Contact</h2>
            <p>
              Email{" "}
              <a href="mailto:manna@builtbydustin.dev">
                manna@builtbydustin.dev
              </a>{" "}
              and we&apos;ll get back to you as soon as we can.
            </p>
          </>
        }
      >
        <h2>How Manna works</h2>
        <p>
          Write or speak what&apos;s on your heart — a worry, a struggle, a
          question, or a moment of gratitude. Manna responds with one Bible
          verse, a short reflection, and a prayer prompt. There are no feeds,
          lists, or notifications — just one verse for the moment you&apos;re
          in.
        </p>

        <h2>Frequently asked questions</h2>
        <ul>
          <li>
            <strong>Do I need an account?</strong> No. Manna uses an anonymous
            session with no username, email, or password. Nothing you write is
            linked to your identity.
          </li>
          <li>
            <strong>Are my reflections private?</strong> Yes. Reflections you
            save are encrypted with AES-256 before they leave your device. See
            our <a href="/manna-privacy-policy">Privacy Policy</a> for details.
          </li>
          <li>
            <strong>How do I save or revisit a reflection?</strong> Choose to
            save a reflection after it&apos;s returned, and find it later in the
            History view.
          </li>
          <li>
            <strong>How do I delete a reflection?</strong> Open the History view
            and delete any reflection permanently. Uninstalling the app also
            removes reflections stored on your device. For full instructions,
            see our <a href="/manna-data-deletion">Data Deletion page</a>.
          </li>
          <li>
            <strong>Can I use my voice?</strong> Yes. You can dictate a
            reflection using your device&apos;s speech recognition. Manna
            prefers on-device recognition and never stores audio recordings.
          </li>
          <li>
            <strong>Which Bible translation does Manna use?</strong> The Berean
            Standard Bible (BSB).
          </li>
          <li>
            <strong>Can I support Manna?</strong> Yes — an optional support link
            opens Ko-fi in your browser. Donations are entirely optional and
            never required to use the app.
          </li>
        </ul>

        <h2>Something not working?</h2>
        <p>
          If you run into a bug or the app isn&apos;t behaving as expected,
          email{" "}
          <a href="mailto:manna@builtbydustin.dev">manna@builtbydustin.dev</a>{" "}
          with a short description of what happened and your device type (iPhone
          or Android). We&apos;ll take a look and follow up.
        </p>
      </MannaLegal>
    </>
  )
}
