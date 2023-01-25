export default function RootLayout({ children }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className="bg-danger">{children}</body>
      </html>
    );
  }