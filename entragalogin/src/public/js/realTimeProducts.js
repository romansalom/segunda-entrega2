const socket= io()

const containerProducts= document.getElementById('realTimeproductsContainer')

socket.on('productRealTime',data=>{
    console.log(data)

    data.map(d=>{
        containerProducts.innerHTML+= `<p>${d.title}</p>- <p>${d._id}</p>`
    })

})





