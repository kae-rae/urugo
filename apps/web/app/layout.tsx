
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#f7f7f7', color: '#111' }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: 16, fontWeight: 600 }}>HomeMatch</div>
        </header>
        <main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
