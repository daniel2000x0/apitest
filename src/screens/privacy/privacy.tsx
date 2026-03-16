
export default function Privacy() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Privacy Policy</h1>

      <p>
        This is a test application created for development and educational
        purposes.
      </p>

      <h2>Information We Collect</h2>
      <p>
        This application may access basic information from your Google account
        only to allow integration with Google Calendar.
      </p>

      <h2>How We Use Information</h2>
      <p>
        The information is used only to create or read calendar events requested
        by the user. We do not store or share your personal data.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        This application uses Google services such as Google Calendar API for
        functionality.
      </p>

      <h2>Data Security</h2>
      <p>
        We do not store user data on our servers. All authentication is handled
        through Google's secure OAuth system.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please contact the
        developer.
      </p>

      <p style={{ marginTop: "40px", fontSize: "14px", color: "gray" }}>
        Last updated: 2026
      </p>
    </div>
  );
}