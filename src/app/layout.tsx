import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';
import './global.css';

import styles from './page.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx('layout')}>
        <div className='w-full px-[10%]'><Navbar /></div>
        <div className='w-full px-[10%]'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
