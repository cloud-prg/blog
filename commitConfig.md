# 安装commitlint
npm install @commitlint/config-conventional @commitlint/cli -D

# 安装husky
npm install huksy -D

# 配置husky
npx husky install
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'