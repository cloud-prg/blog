import Footer from '@/components/Footer';
import Navbar from '../components/Navbar';
import { DefaultSeo } from 'next-seo';

import './global.css';

import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { defaultSeoConfig } from '@/constant/seo';
const cx = classNames.bind(styles);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DefaultSeo
        {...defaultSeoConfig}
      />
      <body className={cx('layout')}>
        <div className='w-full px-[10%]'><Navbar /></div>
        <div className='w-full mb-[8px] border-t border-light-grey' />
        <div className='w-full px-[10%]'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
