const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ci = require('miniprogram-ci');
const { scenes } = require('../constant/scene');
const { APP_ID } = require('../config');
const config = require('../config');

const ENVS = [
  {
    id: 'dev',
    label: '开发',
    value: 'DEV'
  },
  {
    id: 'test',
    label: '测试',
    value: 'TEST',
  },
  {
    id: 'uat',
    label: '预发布',
    value: 'UAT',
  },
  {
    id: 'prod',
    label: '生产',
    value: 'PROD',
  }
]

// 获取小程序初始配置（页面，场景值）
router.get('/getAppInfo', (req, res) => {
  const mpProPath = path.resolve(__dirname, '../../../wx-mall-components/dist')
  const pageConfigFile = 'app.json'
  // 读取app.json文件，获取pages
  const fileContent = fs.readFileSync(`${mpProPath}/${pageConfigFile}`,'utf-8')
  const pageResult = JSON.parse(fileContent)
  // 读取场景值
  const sceneList = scenes
  res.json({
    code: 200,
    message: '操作成功',
    data: {
      pages: pageResult.pages,
      scenes: sceneList,
      envs: ENVS,
    }
  })
})

// 获取小程序的所有页面配置
router.get('/getAppPages', (req, res) => {
  const mpProPath = path.resolve(__dirname, '../../../wx-mall-components/dist')
  const pageConfigFile = 'app.json'
  const fileContent = fs.readFileSync(`${mpProPath}/${pageConfigFile}`,'utf-8')
  const result = JSON.parse(fileContent)
  res.json({
    code: 200,
    message: '操作成功',
    data: {
      pages: result.pages
    }
  })
})

// 生成预览码
router.post('/preview', async (req, res) => {
  const project = new ci.Project({
    appid: APP_ID,
    type: 'miniProgram',
    projectPath: 'wx-mall-components/dist',
    privateKeyPath: 'server/src/keys/private.wx5a35be4e15614ade.key',
    ignores: ['node_modules/**/*'],
  })
  const { 
    pagePath = "pages/index/index", 
    searchQuery = '',
    env,
    scene = 1011,
  } = req.body || {}
  const previewResult = await ci.preview({
    project,
    desc: 'hello',
    setting: {
      ex6: true,
    },
    qrcodeFormat: 'image',
    pagePath,
    searchQuery,
    scene,
    qrcodeOutputDest: 'server/src/static/preview.jpg',
    onProgressUpdate: console.log,
  })
  res.json({
    code: 200,
    message: '操作成功',
    data: {
      previewImg: `${config.HOST}/static/preview.jpg`,
    }
  })
})

module.exports = router