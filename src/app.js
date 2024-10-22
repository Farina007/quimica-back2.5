import express from 'express'
import cors from 'cors'
import router from '../routes.js'
import dotenv from 'dotenv'; // Usando import ao invés de require
import fileUpload from "express-fileupload";

dotenv.config(); // Configurando o dotenv

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(router)

app.listen(4000,()=>{ console.log('runnning!') })