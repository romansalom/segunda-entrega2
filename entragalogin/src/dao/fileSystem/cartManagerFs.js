import fs, { read } from 'fs'

export default class ProductsManagers{
    constructor(){
        this.path= ('./Files/productos.json')
        this.products= []
    }

    static id= 0;

    addProducts= async(title, description, price,thumnail,code,stock)=>{
        ProductsManagers.id++
        let newProduct={
            title,
            description,
            price,
            thumnail,
            code,
            stock,
            id:ProductsManagers.id
        }
        this.products.push(newProduct)
        await fs.promises.writeFile(this.path,JSON.stringify(this.products))
    }

    readProducts= async()=>{
        let showProducts=  await fs.promises.readFile(this.path, 'utf-8')
        const infoProducts= JSON.parse(showProducts)
        return infoProducts
    }
    getProducts = async () => {
        try {
          const data = fs.existsSync(this.path);
          if (data) {
            const info = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(info);
            return products;
          } else {
            return [];
          }
        } catch (error) {
          console.log(error);
        }
      };

    getProductsById= async(id)=>{
        let arrayProducts= await this.readProducts()
        let filter= arrayProducts.find(p=> p.id === id)
        console.log(filter)
    }

    deleteProductById = async(id) => {
        let arrayProducts = await this.readProducts();
        let filteredProducts = arrayProducts.filter(p => p.id !== id);
        if (arrayProducts.length === filteredProducts.length) {
          console.log(`No se encontró un producto con el ID ${id}.`);
          return;
        }
        this.products = filteredProducts;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log(`Se eliminó el producto con el ID ${id}.`);
      }
      deleteAllProducts= async()=>{
        fs.unlink(this.path, (err) => {
            if (err) throw err;
            console.log('Archivo eliminado exitosamente!');
          });
      }
  
    }
    

    //Para eliminar todo el archivo
   /* const borroTodo= new ProductsManagers;
    borroTodo.deleteAllProducts()*/


    // Agregamos algunos productos
 /*   const productsManagers = new ProductsManagers();
   productsManagers.addProducts("Producto 1", "Descripción 1", 10, "thumbnail1.jpg", "ABC123", 5);
   productsManagers.addProducts("Producto 2", "Descripción 2", 20, "thumbnail2.jpg", "DEF456", 10);
   productsManagers.addProducts("Producto 3", "Descripción 3", 30, "thumbnail3.jpg", "GHI789", 15);
    
   async function getAllProducts(){
      const allproducts= await productsManagers.getProducts()
      console.log(allproducts)
    }
getAllProducts()*/
    

// Eliminamos el producto con el ID 2
    //productsManagers.deleteProductById(2);