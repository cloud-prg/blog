# Bug Issues

## Bug 1:
- app路由模式下，服务端获取数据的方式为 `async function` + 开头`await service.yourapi`。 而且这个时间段，`nextjs`的`rewrites`还没初始化。好在`ssr`框架并不会触发浏览器同源策略。直接`fetch`接口即可。当然`use client`下仍然可以走`rewrites`。因此可以把两边的代理地址写在同一套映射里。

## Bug 2:
- `useSearchParams`属于客户端功能，且为异步获取，因此组件外层需要包裹`suspense`组件，否则会报错。但是生产环境下却会导致页面一直停留在`fallback`状态。并且暂时没有找到解决方案。

## Bug 3:
- nest.js standalone打包后运行，发现好多文件路径404。在这个issues中找到了答案。 [https://github.com/vercel/next.js/issues/49283]
- 解决方案：`复制.next/static 至 .next/standalone/.next/static`

## Bug 4:
- 本打算利用`husky`的`pre-push`来执行`docker`脚本的，但发现会有`git push`超时问题。因此只能把`docker`脚本放到`pre-commit`中执行。

## Bug 5:
- `nextjs`中对`fetch`函数进行了内部修改，导致默认的`fetch`为`SSG`
- 注意`app router`的项目中，首页且为`use server`，如果使用的请求函数为`axios`。那么在打包构建时，会把页面的请求给调用了，并生成对应的静态页面(SSG)。也就导致了打包后的静态页面中，刷新并不会再次请求，即不会有请求的结果。
- 但也就首页会有这个问题，解决方式为`axios`改为`fetch`，并在fetch中添加`default-no-store`缓存策略。

## Bug 6:
- `position: sticky`在mdn上说明会粘性至距离最近且`overflow`为 auto hidden scroll的祖先元素。但除此之外，还必须满足目标元素的高度小于父元素高度才行。