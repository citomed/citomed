import "./globals.css";
import "./style.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="az">
      <body>
        <div>{children}</div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
