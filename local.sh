version=v0.0.1
tag=test/blog:${version}

echo "开始打包${tag}"
pnpm run build
echo "结束打包"

echo "开始构建镜像${tag}"
docker build  -t ${tag} .
echo "镜像构建完成"