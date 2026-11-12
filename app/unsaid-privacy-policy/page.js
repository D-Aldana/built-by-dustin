import UnsaidLegal from "../components/unsaid-legal/UnsaidLegal"

export const metadata = {
  title: "Unsaid — Privacy Policy",
  description:
    "Unsaid's privacy policy: no account, no backend, no analytics. Everything you write stays encrypted on your device unless you choose to export or back it up yourself.",
  alternates: {
    canonical: "https://www.builtbydustin.dev/unsaid-privacy-policy",
  },
}

export default function UnsaidPrivacyPolicy() {
  return (
    <UnsaidLegal
      eyebrow="Privacy Policy"
      title="Privacy by design"
      meta="App: Unsaid · Developer: Built by Dustin · Last updated: November 11, 2026"
      lede="Unsaid helps you recognize and prepare to share important thoughts with a partner. This policy explains, plainly, what the app does and does not do with your information."
      contact={
        <>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:unsaid@builtbydustin.dev">
              unsaid@builtbydustin.dev
            </a>
            .
          </p>
        </>
      }
    >
      <h2>The short version</h2>
      <p>
        Unsaid does not collect, transmit, or have access to anything you write.
        There is no account, no server, and no internet connection required to
        use it. Everything you enter stays encrypted on your device, under your
        control, unless you deliberately create and share a backup or export
        file yourself.
      </p>

      <h2>No account required</h2>
      <p>
        Unsaid does not require you to sign up, log in, or provide a name, email
        address, or any other identifying information to use the app.
      </p>

      <h2>What Unsaid stores, and where</h2>
      <p>As you use Unsaid, the app creates records for things like:</p>
      <ul>
        <li>Thoughts you capture, and updates to them over time</li>
        <li>Daily check-in responses</li>
        <li>Guided exploration answers</li>
        <li>Prepared conversation drafts</li>
        <li>Post-conversation reflections</li>
        <li>Weekly communication-confidence ratings</li>
        <li>
          App preferences, such as your onboarding choices and reminder settings
        </li>
      </ul>
      <p>
        All of this is stored in a single database on your device, encrypted at
        rest (SQLCipher). The encryption key is generated on your device and
        held in the operating system&apos;s secure credential storage; it never
        leaves your device and is never seen by us. This data is excluded from
        iCloud and Android system backups, so it only ever exists on the device
        where you created it, unless you create an encrypted backup yourself
        (below).
      </p>

      <h2>We don&apos;t collect anything</h2>
      <p>
        Unsaid has no backend server. Nothing you write is sent anywhere,
        because there is nowhere for it to go:
      </p>
      <ul>
        <li>No analytics or usage tracking</li>
        <li>No advertising or ad identifiers</li>
        <li>No crash or error reporting</li>
        <li>No third-party SDKs that transmit data</li>
        <li>
          No sale or sharing of data with any third party, because none is
          collected
        </li>
      </ul>
      <p>
        On Android, Unsaid does not even request the internet permission — the
        app is technically incapable of making a network connection. On iOS, the
        app likewise makes no network requests of any kind.
      </p>
      <p>
        Any progress or trends shown on the Growth screen are calculated
        entirely on your device from your own local data. Nothing is uploaded to
        compute them.
      </p>

      <h2>Permissions Unsaid may ask for, and why</h2>
      <ul>
        <li>
          <strong>Face ID / biometric unlock (optional):</strong> if you turn on
          app lock, your device&apos;s own biometric or passcode check is used
          to show or hide the app&apos;s content. Your biometric data is handled
          entirely by your device&apos;s operating system — Unsaid never
          receives or stores it.
        </li>
        <li>
          <strong>Notifications (optional):</strong> if you enable reminders,
          Unsaid schedules local, on-device notifications only. Notification
          text is generic (e.g. &quot;Take a moment to check in with
          yourself&quot;) and never includes the content of your thoughts.
        </li>
        <li>
          <strong>File access, for export and backup only:</strong> when you
          choose to export your data or create a backup, Unsaid writes a file
          and hands it to your device&apos;s own share sheet or file picker so
          you decide where it goes. Unsaid does not access your files otherwise.
        </li>
      </ul>

      <h2>Exporting and backing up your data</h2>
      <p>
        Export and backup only ever happen when you deliberately start them from
        Settings — never automatically or in the background.
      </p>
      <ul>
        <li>
          <strong>Export</strong> creates a readable, unencrypted copy of your
          data for you to keep or move elsewhere. Unsaid warns you before
          creating it that anyone who opens the file can read it.
        </li>
        <li>
          <strong>Backup</strong> creates a full encrypted copy of your data,
          protected by a passphrase that only you set and that Unsaid never
          stores or has access to. If you forget that passphrase, we cannot
          recover the backup — we have no way to open it either.
        </li>
      </ul>
      <p>
        In both cases, the resulting file is handed to your device&apos;s share
        sheet or file picker, so you — not Unsaid — choose where it&apos;s saved
        (for example, your own cloud storage, a computer, or another app).
      </p>

      <h2>Deleting your data</h2>
      <p>
        You can permanently delete everything you&apos;ve entered at any time
        from Settings. Deletion removes all thoughts, updates, check-ins,
        explorations, preparations, reflections, confidence ratings, and
        scheduled reminders from your device, and cannot be undone. Uninstalling
        the app has the same effect on local data, unless you&apos;ve made a
        backup first.
      </p>

      <h2>Safety note</h2>
      <p>
        Unsaid is not a therapy service, a crisis line, or a substitute for
        professional care. If you or someone else is in immediate danger, please
        contact your local emergency services.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        Unsaid is not directed to children and does not knowingly collect
        information from anyone. Since the app collects no personal information
        from anyone, there is no information about children for us to have.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If a future version of the app changes how data is handled — for
        example, by adding a feature that requires a network connection —
        we&apos;ll update this page and its effective date before that feature
        ships.
      </p>
    </UnsaidLegal>
  )
}
