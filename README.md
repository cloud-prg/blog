## 介绍
基于next.js、ts、tailwindcss，配合个人开发的nestjs后端，实现了一个简单的博客系统。小而全，包括 `docker`、`jenkins`来跑通自动部署全流程。

## 开始
```bash
pnpm install
pnpm run dev
```

## 构建
```bash
pnpm run build
```

## 部署
```bash
sh docker.sh
# 或者触发husky的pre-commit钩子
git commit -m 'your commit message' 
```

## 线上地址
- [http://blog.cloudprg.cn](http://blog.cloudprg.cn)
- [http://www.jiujiuwarehouse.com:3005](http://www.jiujiuwarehouse.com:3005)
