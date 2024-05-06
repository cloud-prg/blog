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
            url: 'https://blog.cloudprg.cn/paper',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://blog.cloudprg.cn/rollback',
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
        {
            url: 'https://www.cloudprg.cn',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.cloudprg.cn/paper',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://www.cloudprg.cn/rollback',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.3,
        },

        {
            url: 'https://www.cloudprg.cn/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
    ]
}