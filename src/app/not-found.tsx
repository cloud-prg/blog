import Link from 'next/link'
import Image from 'next/image'
import NotFoundPng from '@/assets/image/404.png'

export default function NotFound() {
  return (
    <div className='flex gap-[60px] flex-col items-center justify-center h-screen'>
      <Image src={NotFoundPng} alt='404 Not Found' width={600} height={600} />
      <span className='text-[24px] font-normal text-grey-500'>页面路径不存在 - 404</span>
      <span className='text-[16px] text-dark-grey'>路径可能存在错误，或者该页面暂时不可用，请点击返回主页再次尝试</span>
      <Link className='text-primary-4 underline' href="/">返回主页</Link>
    </div>
  )
}
