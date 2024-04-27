import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';

import './global.css';

import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { defaultSeoConfig } from '@/constant/seo';
import { Metadata } from 'next';
import BgSvg from '@/assets/svg/bg.svg'

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  ...defaultSeoConfig,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="baidu-site-verification" content="codeva-WeQVPvZzpD"></meta>
      <body className={cx('layout')}>
        <Navbar />
        <div className={cx('layout-content')}
          style={{
            background: `url(${BgSvg.src})`,
          }}
        >
          {children}</div>
        <Footer />
      </body>
    </html>
  );
}
