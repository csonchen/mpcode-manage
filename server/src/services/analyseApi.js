const path = require('path');
const fs = require('fs');
const { getAllFiles, listComponents, getFileJsonData, getFilterFiles } = require('../tools/fileUtils');
const { isWxmlImportComponent } = require('../tools/parseUtils');

/**
 * 分析图片文件在项目的引入情况
 * @param {*} imgDirSrc 图片源文件目录
 * @param {*} sourceDir 根目录
 * @param {*} sources 需要分析的源文件数组
 */
const analyseImages = (imgDirSrc, sourceDir, sources) => {
  // 需要分析的图片目录地址
  const imgDirPath = path.resolve(imgDirSrc)
  const imgFiles = getAllFiles(imgDirPath)

  if (imgFiles.length === 0) return

  // 只保留图片的文件名数组
  const allImageFiles = imgFiles.map(imgItem => path.basename(imgItem))

  // 查找所有的wxml, js文件
  const allWxmlFiles = sources.reduce((acc, targetEntry) => {
    const targetDirPath = path.resolve(sourceDir + targetEntry)
    const targetAllFiles = getAllFiles(targetDirPath, true)
    const allWxmlFiles = targetAllFiles.filter(filePath => {
      const extname = path.extname(filePath)
      return ['.wxml', '.js'].indexOf(extname) > -1
    })
    return [...acc, ...allWxmlFiles]
  }, [])

  // 遍历图片集数组，查找文件是否有引入
  let imgIdx = 1
  const result = allImageFiles.reduce((acc, imgName) => {
    const rowItems = allWxmlFiles.reduce((childAcc, filePath) => {
      const fileStr = fs.readFileSync(filePath, 'utf8')
      return fileStr.indexOf(imgName) === -1 ? childAcc : [...childAcc, {
        id: imgIdx++,
        image: imgName,
        existPath: filePath,
        status: 1,
      }]
    }, [])
    
    // 如果查找完毕为空，则说明没有引入到该图片
    return rowItems.length === 0 ? [...acc, {
      id: imgIdx++,
      image: imgName,
      existPath: '没有用到',
      status: 0,
    }] : [...acc, ...rowItems]
  }, [])

  return result
}

/**
 * 分析项目组件引入情况
 * @param {*} compDirSrc 
 */
const analyseComponents = (compDirSrc) => {
  // 解析入口目录
  const entryDir = path.resolve(compDirSrc)
  const allFiles = getAllFiles(entryDir)

  if (allFiles.length === 0) return

  const filterFiles = getFilterFiles(allFiles, ['wxml', 'json'])

  let idx = 1
  // 组装导出对象数组数据
  const pageWithComponents = filterFiles.reduce((acc, { jsonFile }) => {
    const current = path.basename(jsonFile, '.json')
    const currentDir = path.dirname(jsonFile)
    const components = listComponents(jsonFile) || []

    if (components.length == 0) {
      return [...acc, { 
        page: current, 
        directory: currentDir,
      }]
    } else {
      // 输入wxml地址，转化为json标签对象
      const fileJsonData = getFileJsonData(currentDir + `/${current}.wxml`)
      const childs = components.reduce((childAcc, { name, path }) => {
        const used = isWxmlImportComponent(fileJsonData, name)
        return [...childAcc, {
          id: idx++,
          page: current,
          directory: currentDir,
          component: name,
          componentPath: path,
          used: used ? 'true' : 'false',
        }]
      }, [])
      return [...acc, ...childs]
    }
  }, [])

  return pageWithComponents
}

module.exports = {
  analyseImages,
  analyseComponents,
}