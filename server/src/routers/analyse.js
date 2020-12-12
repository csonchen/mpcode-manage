const express = require('express');
const router = express.Router();
const path = require('path');
const { analyseImages, analyseComponents } = require('../services/analyseApi');
const ObjectsToCsv = require('objects-to-csv');
const { image, component, HOST } = require('../config');

router.get('/images', (req, res) => {
  const { entry, sources } = image
  const sourceDir = __dirname + '/../../../'
  const imgSourceDir = sourceDir + entry
  const resData = analyseImages(imgSourceDir, sourceDir, sources)

  res.json({
    code: 200,
    message: '操作成功',
    data: {
      list: resData,
    }
  })
})

router.get('/imagesExport', async (req, res) => {
  const { entry, sources } = image
  const sourceDir = __dirname + '/../../../'
  const imgSourceDir = sourceDir + entry
  const resData = analyseImages(imgSourceDir, sourceDir, sources)

  // 导出文件
  const csv = new ObjectsToCsv(resData)
  const exportPathUrl = path.resolve(`${__dirname}/../static/csv/test.csv`)
  await csv.toDisk(exportPathUrl)

  res.json({
    code: 200,
    message: '操作成功',
    data: {
      file: `${HOST}/static/csv/test.csv`,
    }
  })
})

router.get('/components', (req, res) => {
  const { entry } = component
  const sourceDir = __dirname = '/../../../'
  const compSourceDir = sourceDir + entry
  const resData = analyseComponents(compSourceDir)

  res.json({
    code: 200,
    message: '操作成功',
    data: {
      list: resData,
    }
  })
})

module.exports = router;