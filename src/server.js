import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJson())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJson());
    socket.on('action', store.dispatch.bind(store));
  })
}
