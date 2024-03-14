import Navbar from '../components/Navbar';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen mx-auto w-[80%] flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
