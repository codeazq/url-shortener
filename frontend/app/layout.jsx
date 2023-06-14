import "@styles/global.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Short Up @",
  description: "Create short n personalized URLs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
