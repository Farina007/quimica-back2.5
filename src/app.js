import express from 'express'
import cors from 'cors'
import router from '../routes.js'
import morgan from 'morgan';
import dotenv from 'dotenv'; // Usando import ao invés de require

dotenv.config(); // Configurando o dotenv

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(morgan('dev'))

app.listen(3000,()=>{ console.log('runnning!') })