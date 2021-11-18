const fs=require('fs')
const express=require('express')
const Busyboy= require('busboy')
const path=require('path')
const app= express()




app.get('/upload',(req,res)=>{
    res.sendFile(__dirname+'/htmlFiles/upload.html')
})


app.get('/hostUpload',(req,res)=>{
     res.sendFile(__dirname+'/hostUpload.js')
})

app.get('/',(req,res)=>{
   
      res.sendFile(__dirname+'/htmlFiles/viewFiles.html')
    
})

app.get( '/viewFile',(req,res)=>{
  res.sendFile(__dirname+'/clientViewFile.js')
})

app.get('/listfile',(req,res)=>{
  const finalList=[]
  fs.readdir("/Volumes/Extreme SSD/movies/",(err,files)=>{
    if(err)console.log(err)
    else{
      files.forEach(file=>{
        finalList.push(file)
      })
      console.log(finalList)
     res.send(finalList)
    }
  })
  
})

app.get('/playvideo/:id',(req,res)=>{

  res.send(videoPlayHTML(req.params.id))
})

app.get('/video/:id',(req,res)=>{
  console.log("requested")
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  console.log(req.params.id)
  const videoPath = '/Volumes/Extreme SSD/movies/'+req.params.id;
  const videoSize = fs.statSync(videoPath).size;

  
  const CHUNK_SIZE = 10 ** 6; 
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

 
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  
  res.writeHead(206, headers);

  
  const videoStream = fs.createReadStream(videoPath, { start, end });
  
  
  videoStream.pipe(res);
})

app.post('/file',(req,res,next)=>{
    const busboy=Busyboy({
      headers:req.headers
    })

    busboy.on('file',(fieldname, file, filename, encoding, mimetype)=>{
       console.log("received file")
       const saveloc=path.join('/Volumes/Extreme SSD/movies',filename)
       file.pipe(fs.createWriteStream(saveloc))
    })
    busboy.on('finish',()=>{
      res.send("done!")
    })

    return req.pipe(busboy)
})

function videoPlayHTML(id){
    const html=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Video streaming</title>
    </head>
    <body>
         <video id="videoPlayer" width="1400" height=800" controls autoplay>
            <source src="/video/${id}" type="video/mp4" />
        </video>
    </body>
    </html>`
     return html
}


app.listen(4000)