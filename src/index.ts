import express from 'express';
import {createConnection} from "typeorm";
import routes from './router';

let app = express();
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/api', routes);

createConnection().then(connection=>{
    app.listen(8080, ()=>{
        console.log('server is listening 8080');
    });
})
