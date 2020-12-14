# mpcode-manage

小程序集成组件测试，静态资源分析，构建及发版一体化平台

## 运行

```shell
# init submodule（引入wx-mall-components小程序项目，作为自动化构建的原始项目）
git submodule update --init --recursive

# add keys（因为需要用到小程序的构建，发版等权限，需要添加小程序秘钥文件）
cd server
mkdir keys
touch private.wx5a35be4e15614ade.key // 这个需要自行添加自己的秘钥文件

# install packages
npm run client-install
npm run server-install

# run start
npm run client
npm run server
```
