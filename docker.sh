username=yunshangzhou98
password=Lihuazou123!
hub_url=registry.cn-hangzhou.aliyuncs.com
instance_name=cloud_prg_hub

docker login --username=$username --password=$password $hub_url

version=v0.0.2
tag_prefix=$hub_url/$instance_name
tag=$tag_prefix/blog:${version}
platform=linux/amd64

echo "开始打包${tag}"
pnpm run build
echo "结束打包"

echo "开始构建镜像${tag}"
sudo docker build --platform ${platform} -t ${tag} .
echo "镜像构建完成"

sudo docker push ${tag}