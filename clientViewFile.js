
window.onload=function(){
    fetch('/listfile').then((response)=>{
          response.json().then((res)=>{
             console.log(res[0])
             const ul=document.getElementById('fileList')
             const buttonText=document.createTextNode("play")
             res.forEach(element => {
                const li=document.createElement('li')
                const button=document.createElement('button')
                const buttonText=document.createTextNode("play")

                button.setAttribute("id",element)
                button.setAttribute("onClick","playButton(this.id)")
                
                button.appendChild(buttonText)
                li.appendChild(document.createTextNode(element))
                li.appendChild(button)
                ul.appendChild(li)
             });
        })
    })
}

function playButton(id){
    // console.log("button clicked --> " +id)
    // fetch('/playvideo/'+id).then((response)=>{
    //     response.text().then((res)=>{
    //         document.getElementById('content').innerHTML='<object type="text/html" data='+res+'></object>'
    //     })
    // })
    parent.location='/playvideo/'+id
}

