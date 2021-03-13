const express = require('express')
const cors = require('cors')
const app = express()
const server = app.listen(process.env.PORT || '80')
const io = require('socket.io')(server)
const db = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.DB_HOST || '127.0.0.1',
    user : process.env.DB_USER ||'root',
    password : process.env.DB_PASS ||'',
    database : process.env.DB_NAME ||'twitap'
  }
})

// app.use(cors())

io.origins((origin, callback) => {
  callback(null, true)
})

io.on('connection', client => {
  console.log(client.id)

  client.on('image_slider_give_state', (data) => {
    io.sockets.emit('image_slider_new_state', data)
  })

  client.on('image_banner_give_state', (data) => {
    io.sockets.emit('image_banner_new_state', data)
  })
  
  client.on('widget_type_text_changed', (data) => {
    io.sockets.emit('widget_type_text_state', data)
  })

  client.on('widget_type_image_changed', (data) => {
    io.sockets.emit('widget_type_image_state', data)
  })
})

// app.get('/v1/widget/state/:token/:clientId', function (req, res, next) {
//   db.select().from('widgets').where('token', req.params.token)
//     .then(data => {
//       io.to(`${req.params.clientId}`).emit('state', data)
//       res.send(data)
//     })
//     .catch(err => console.log(err))
// })
