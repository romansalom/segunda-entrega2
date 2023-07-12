
const form= document.getElementById('loginForm')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const data= new FormData(form)
    const obj= {}
    data.forEach((value, key)=>obj[key]=value)

    try{
        const response = await fetch('/api/session/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json '
            } 
        })
        const responseData= await response.json()
        console.log(responseData)
        if(responseData.status === 'success'){
            window.location.replace('/home')
        }
    }
    catch(err){
        console.log(err)
    }
   
})