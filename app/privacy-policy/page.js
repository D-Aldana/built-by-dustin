export const metadata = {
  title: "Wisdumb — Privacy Policy",
  description:
    "Privacy policy for Wisdumb, a daily quote app that generates humorous, pseudo-profound quotes. Explains what data is collected and how it's used.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/privacy-policy",
  },
}

export default function PrivacyPolicy() {
  return (
    <main
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "2rem 1.5rem",
        lineHeight: 1.7,
        color: "#222",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <h1>Wisdumb — Privacy Policy</h1>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Last updated: March 10, 2026
      </p>

      <h2>Overview</h2>
      <p>
        Wisdumb is a daily quote app that generates humorous, pseudo-profound
        quotes. Your privacy is important to us. This policy explains what data
        we collect and how we use it.
      </p>

      <h2>Data We Collect</h2>
      <ul>
        <li>
          <strong>Anonymous account ID:</strong> When you first open the app, an
          anonymous account is created automatically. No email, name, or
          personal information is required.
        </li>
        <li>
          <strong>Quotes and favorites:</strong> The quotes generated for you
          and any favorites you save are stored in our database, linked to your
          anonymous account.
        </li>
        <li>
          <strong>Notification preferences:</strong> If you set a daily reminder
          time, that preference is stored with your account.
        </li>
      </ul>

      <h2>Data We Do Not Collect</h2>
      <ul>
        <li>No personal information (name, email, phone number)</li>
        <li>No location data</li>
        <li>No contacts or photos</li>
        <li>No usage analytics or tracking</li>
      </ul>

      <h2>Third-Party Services</h2>
      <ul>
        <li>
          <strong>Supabase:</strong> Used for authentication and data storage.{" "}
          <a href="https://supabase.com/privacy">Supabase Privacy Policy</a>
        </li>
        <li>
          <strong>OpenAI:</strong> Used to generate quotes. No user data is sent
          to OpenAI — only a generic prompt.{" "}
          <a href="https://openai.com/privacy">OpenAI Privacy Policy</a>
        </li>
      </ul>

      <h2>Data Storage and Security</h2>
      <p>
        Your data is stored securely on Supabase servers with row-level security
        policies that ensure users can only access their own data. All
        communication between the app and our servers is encrypted via HTTPS.
      </p>

      <h2>Data Deletion</h2>
      <p>
        Since accounts are anonymous, you can delete your data by uninstalling
        the app. If you would like your data removed from our servers, contact
        us at the email below.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Wisdumb is not directed at children under 13. We do not knowingly
        collect data from children.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes will be reflected
        on this page with an updated date.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this privacy policy, contact us at{" "}
        <a href="mailto:dustin.j.aldana@gmail.com">dustin.j.aldana@gmail.com</a>
        .
      </p>
    </main>
  )
}
