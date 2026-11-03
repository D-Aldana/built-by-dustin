import MannaLegal from "../components/manna-legal/MannaLegal"

export const metadata = {
  title: "Manna — Privacy Policy",
  description:
    "Manna's privacy policy: no accounts, no personal identifiers, AES-256 encrypted reflections, and exactly what data the app does and doesn't collect.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/manna-privacy-policy",
  },
}

export default function MannaPrivacyPolicy() {
  return (
    <MannaLegal
      eyebrow="Privacy Policy"
      title="A private space, kept private"
      meta="App: Manna · Developer: Built by Dustin · Last updated: June 27, 2026"
      lede="Manna is a private space for Christians to process their thoughts through AI-guided scriptural reflection. Privacy is a core principle of the app. This policy explains what data Manna handles, why, and your choices."
      contact={
        <>
          <h2>Contact</h2>
          <p>
            Questions about your privacy? Email{" "}
            <a href="mailto:manna@builtbydustin.dev">manna@builtbydustin.dev</a>
            .
          </p>
        </>
      }
    >
      <h2>No account, no personal identity</h2>
      <p>
        Manna does not require you to create an account. There is no username,
        email, password, or sign-in. The app uses an anonymous session that is
        not linked to your name, email, phone number, or any personal
        identifier.
      </p>

      <h2>What We Collect</h2>
      <ul>
        <li>
          <strong>Your reflections (&quot;Pourings&quot;):</strong> The text you
          write or dictate, along with the Bible verse, commentary, and prayer
          the app returns. This is the only personal content the app handles. It
          is stored only if you choose to save a reflection to your history.
        </li>
        <li>
          <strong>Operational data:</strong> Short-lived, anonymous records used
          to keep the service running and prevent abuse — such as aggregate
          daily usage counts and temporary rate-limit records (which may briefly
          include your IP address for security purposes). This data is not used
          to identify you and is not sold or shared for advertising.
        </li>
      </ul>

      <h2>What We Do Not Collect</h2>
      <ul>
        <li>No name, email address, or phone number</li>
        <li>No location data</li>
        <li>
          No photos or videos (the &quot;share verse&quot; image is created on
          your device and shared only through your device&apos;s share menu)
        </li>
        <li>
          No advertising identifiers, and no analytics, tracking, or
          crash-reporting tools
        </li>
        <li>No audio recordings — see &quot;Voice Input&quot; below</li>
      </ul>

      <h2>Voice Input</h2>
      <p>
        If you choose to dictate a reflection, Manna uses your device&apos;s
        speech recognition to convert speech to text. Manna prefers on-device
        recognition so your audio stays on your phone. Audio is transcribed and
        discarded — Manna does not store or upload audio recordings. Depending
        on your device and settings, your operating system&apos;s speech service
        (Apple or Google) may process the audio; that processing is governed by
        your device maker&apos;s privacy policy.
      </p>

      <h2>How Your Reflections Are Protected</h2>
      <p>
        Reflections you save are encrypted with AES-256 before they leave your
        device. The encryption key is generated on your device and stored
        securely in your device&apos;s keychain/keystore; it never leaves your
        device. All network traffic uses encrypted HTTPS connections.
      </p>

      <h2>Third-Party Services</h2>
      <ul>
        <li>
          <strong>Anthropic (Claude AI):</strong> The text of your reflection is
          sent to Anthropic&apos;s API to generate the verse, commentary, and
          prayer. Anthropic does not use data submitted through its API to train
          its models.{" "}
          <a href="https://www.anthropic.com/legal/privacy">
            Anthropic Privacy Policy
          </a>
        </li>
        <li>
          <strong>YouVersion (Bible API):</strong> Verse references (e.g.
          &quot;John 3:16&quot;) are sent to retrieve Bible text. No reflection
          text or personal data is sent.
        </li>
        <li>
          <strong>Supabase:</strong> Provides our encrypted database, anonymous
          session, and backend hosting.{" "}
          <a href="https://supabase.com/privacy">Supabase Privacy Policy</a>
        </li>
        <li>
          <strong>Ko-fi (optional donations):</strong> If you choose to support
          Manna, a &quot;support&quot; link opens Ko-fi in your browser. Any
          payment is handled entirely by Ko-fi under its own privacy policy;
          Manna does not receive or store your payment information.
        </li>
      </ul>

      <h2>Data Retention and Deletion</h2>
      <p>
        Saved reflections are kept until you delete them. You can permanently
        delete any reflection from within the app&apos;s History view, and
        uninstalling the app removes reflections stored on your device.
        Temporary operational records expire automatically. For full
        instructions, see our{" "}
        <a href="/manna-data-deletion">Data Deletion page</a>.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Manna is not directed to children and does not knowingly collect data
        from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by updating the date above.
      </p>
    </MannaLegal>
  )
}
