import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import ngoUserRoutes from './routes/ngoUserRoutes.js'
import requestRoutes from './routes/requestRoutes.js'

import {Storage} from '@google-cloud/storage'
import UUID from 'uuid-v4'
import formidable from 'formidable-serverless'

dotenv.config()

connectDB()

const app = express()
app.use(cors())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/ngoUser', ngoUserRoutes)
app.use('/api/request', requestRoutes)


import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var admin = require("firebase-admin");
var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const userRef = admin.firestore().collection("users");
const storage = new Storage({
  keyFilename: "admin.json",
});
app.post("/userUpload", async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
  
    try {
      form.parse(req, async (err, fields, files) => {
          let uuid = UUID();
          var downLoadPath = process.env.DOWNLOAD_PATH
  
          const profileImage = files.image;
          // url of the uploaded image
          let imageUrl;
  
          const docID = userRef.doc().id;
  
          if (err) {
          return res.status(400).json({
              message: "There was an error parsing the files",
              data: {},
              error: err,
          });
          }
          const bucket = storage.bucket(process.env.BUCKET);
  
          if (profileImage?.size == 0) {
          // do nothing
          } else {
              const imageResponse = await bucket.upload(profileImage.path, {
                  destination: `users/${profileImage.name}`,
                  resumable: true,
                  metadata: {
                    contentType: 'image/jpeg'
                  },
              });
              imageUrl =
                  downLoadPath +
                  encodeURIComponent(imageResponse[0].name) +
                  "?alt=media&token=" +
                  uuid;
          }
          const userModel = {
              profileImage: profileImage?.size == 0 ? "" : imageUrl,
          };
  
          await userRef
          .doc(docID)
          .set(userModel, { merge: true })
          .then((value) => {
              // return response to users
              res.status(200).send({
              message: "user created successfully",
              data: userModel,
              error: {},
              });
          });
          
      });
    } catch (err) {
      res.send({
        message: "Something went wrong",
        data: {},
        error: err,
      });
    }
});



const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
)
