const express = require('express');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// test api
app.get('/', (req, res) => res.send('hello world'))

// 允许访问static目录资源
app.use('/static', express.static(path.join(__dirname, 'static')))

// 加载路由
app.use('/api/analyse', require('./routers/analyse'))
app.use('/api/build', require('./routers/build'))

const port = 5000;
app.listen(port, () => console.log(`make mpcode service listen on port ${5000}`))