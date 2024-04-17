import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://blog.cloudprg.cn',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://acme.com/blog/paper',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://acme.com/blog/rollback',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },
   
        {
            url: 'https://blog.cloudprg.cn/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
    ]
}