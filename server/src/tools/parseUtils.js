const fs = require('fs');

/**
 * 判断当前页面是否引入该组件标签
 * @param {*} pageJsonData 
 * @param {*} tagName 
 */
const isWxmlImportComponent = (pageJsonData, tagName) => {
  if (!pageJsonData.child) return false
  
  tagName = tagName.toLowerCase()
  for (let item of pageJsonData.child) {
    // 判断标签名是否一致
    if (item.tag === tagName) {
      return true
    }

    // 递归判断子节点的标签
    if (item.child) {
      const flag = isWxmlImportComponent(item, tagName)
      if (flag) {
        return true
      }
    }
  }
  return false
}

/**
 * 更换配置文件的环境
 * @param {*} filePath 更换配置文件的路径
 * @param {*} env 环境变量字符串
 */
const replaceEnvironment = (filePath, env) => {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const resFileContent = fileContent.replace(/(const appEnv = ENV\.[\w]+;)/, `const appEnv = ENV.${env};`)
  fs.writeFileSync(filePath, resFileContent)
  return true
}

/**
 * 更换配置文件的版本号
 * @param {*} filePath 更换配置文件的路径
 * @param {*} version 小程序发版号
 */
const replaceVersion = (filePath, version) => {

}

module.exports = {
  isWxmlImportComponent,
  replaceEnvironment,
  replaceVersion,
}