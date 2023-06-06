import express from 'express';
import handlebars from 'express-handlebars';
import mongoose, { mongo } from 'mongoose';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import __dirname from './utils.js';

import sessionRoutes from './routes/session.routes.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import registerChatHandler from './listeners/chatHandler.js';
import cartRouter from './routes/cart.router.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(server);

const connection = mongoose.connect(
  'mongodb+srv://mtgprimaria:155383070@clustertrinidad.ohzqqhf.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        'mongodb+srv://romanatlas:lote1045@cluster0.xkmhsmh.mongodb.net/?retryWrites=true&w=majority',
      ttl: 20,
    }),
    secret: 'codesessionSecret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/session', sessionRoutes);

io.on('connection', (socket) => {
  registerChatHandler(io, socket);
});
