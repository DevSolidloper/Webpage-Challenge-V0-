export const metadata = {
  title: "ML Model Evaluation Dashboard",
  description: "V0 page deployed on Next.js + Tailwind",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
