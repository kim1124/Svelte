import io from 'socket.io'
import http from 'http'

const SocketServer = function (app, socketPort = 3333) {
    const httpServer = http.createServer(app)
    const socketServer = io(httpServer)

    socketServer.on('connection', client => {
        console.log('클라이언트가 접속하였습니다.')

        client.on('chatting', (msg) => {
            socketServer.emit('chatting', msg)
        })

        client.on('disconnect', () => {
            console.warn('클라이언트가 접속을 종료하였습니다.')
        })
    })

    httpServer.listen(socketPort, () => {
        console.log('Express 서버가 정상적으로 설치되었습니다. 포트번호 : ', socketPort)
    })
}

export default SocketServer
