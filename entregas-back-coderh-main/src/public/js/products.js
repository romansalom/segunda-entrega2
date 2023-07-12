

const btnCards = document.querySelectorAll('.btnCard');

/*
btnCards.forEach(function(button) {
    button.addEventListener('click', function() {
      alert('¡Botón clicado!');
    });
  });
*/


btnCards.forEach((button)=>{
    button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        
        const data = {
            productId: productId
           
          };
        
          fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(result => {
              console.log(result.message)
            })

            .catch(error => {
              console.error("Error:", error);
            });
        

    })//cierre del addventList

})//cierre del foreach






  /*
  se utiliza la sintaxis dataset.nombreAtributo. 
  En este caso, button.dataset.productId se utiliza 
  para obtener el valor del atributo data-product-id del botón.
  */