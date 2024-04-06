# Bug Issues

## Bug 1:
- app路由模式下，服务端获取数据的方式为 `async function` + 开头`await service.yourapi`。 而且这个时间段，`nextjs`的`rewrites`还没初始化。好在`ssr`框架并不会触发浏览器同源策略。直接`fetch`接口即可。当然`use client`下仍然可以走`rewrites`。因此可以把两边的代理地址写在同一套映射里。

## Bug 2:
- `useSearchParams`属于客户端功能，且为异步获取，因此组件外层需要包裹`suspense`组件，否则会报错。但是生产环境下却会导致页面一直停留在`fallback`状态。并且暂时没有找到解决方案。

## Bug 3:
- nest.js standalone打包后运行，发现好多文件路径404。在这个issues中找到了答案。 [https://github.com/vercel/next.js/issues/49283]
- 解决方案：`I faced this issue today, I just found a workaround for this: copy .next/static to .next/standalone/.next/static`

