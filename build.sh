#!/bin/bash
###
 # @Author: FrankFungcode combeebe@gmail.com
 # @Date: 2025-12-13 16:20:31
 # @LastEditors: FrankFungcode combeebe@gmail.com
 # @LastEditTime: 2025-12-16 12:05:11
 # @FilePath: \frank-ai-bff\build.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 

# 构建脚本 - 编译TypeScript并复制静态资源

set -e  # 遇到错误立即退出

echo "🔨 开始构建..."

# 1. 编译 TypeScript
echo "📦 编译 TypeScript..."
npx tsc

# 2. 复制 views 目录
echo "📋 复制 views 目录到 dist..."
cp -r views dist/views

# 3. 复制 assets 目录
echo "🎨 复制 assets 目录到 dist..."
cp -r assets dist/assets

echo "✅ 构建完成！"
