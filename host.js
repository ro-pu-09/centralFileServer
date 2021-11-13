window.onload=function(){
    console.log(document.getElementById("send"))
    document.getElementById('send').addEventListener("click",()=>{
        document.getElementById('status').innerHTML="uploading"
        const file=document.getElementById('inputFile').files[0]
        const formData= new FormData()
        formData.append('testFile',file)
        console.log(file)
        fetch('/file',{
            method:'POST',
            body:formData
        }).then(()=>{
            console.log("done uploading")
            document.getElementById('status').innerHTML="done uploading"
        }).catch(()=>{
            console.log("error in uploading ")
            document.getElementById('status').innerHTML="error in uploading"
        })
    })
}
