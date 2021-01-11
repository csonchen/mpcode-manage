module.exports = {
  ENVS: [
    { id: 'dev', label: '开发', value: 'DEV' },
    { id: 'test', label: '测试', value: 'TEST' },
    { id: 'uat', label: '预发布', value: 'UAT' },
    { id: 'prod', label: '生成', value: 'PROD' }
  ],
  'wx-mall-components': {
    HOST: 'http://192.168.198.59:5000', // TODO: change
    APP_ID: 'wx5a35be4e15614ade',
    projectPath: 'wx-mall-components/dist',
    privateKeyPath: 'server/src/keys/private.wx5a35be4e15614ade.key',
    image: {
      entry: 'wx-mall-components/dist/images',
      exportPath: '/shell/csv/images_stat.csv',
      sources: [
        'wx-mall-components/dist/app.json',
        'wx-mall-components/dist/pages', 
        'wx-mall-components/dist/components',
      ]
    },
    component: {
      entry: 'wx-mall-components/dist/pages',
      exportPath: 'wx-mall-components/shell/csv/components_stat.csv'
    },
  },
  'rainbow-mp': {
    HOST: 'http://192.168.198.59:5000', // TODO: change
    APP_ID: 'wx83b25ac313aea733',
    projectPath: 'rainbow-mp/xinyu',
    privateKeyPath: 'server/src/keys/private.wx83b25ac313aea733.key',
  }
}