module.exports = {
  HOST: 'http://192.168.198.59:5000', // TODO: change
  APP_ID: 'wx5a35be4e15614ade',
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
}