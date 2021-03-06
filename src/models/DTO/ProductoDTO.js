class ProductoDTO {
    constructor(product){   
        this.id = product.id || product._id
        this.nombre = product.title || product.nombre;
        this.precio = product.price || product.precio
        this.foto  = product.thumbnail || product.foto
    }

    getProducto(){
        return {
            id: this.id,
            title: this.nombre,
            price: this.precio,
            thumbnail: this.foto
        }
    }
}

module.exports = ProductoDTO;