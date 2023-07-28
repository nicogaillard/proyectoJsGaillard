//Archivo Main JS donde desarrollo el código de mi sitio
//El archivo backups era el anterior Main hasta la entrega sin el uso de DOM en adelante

//class constructora de objetos pc
class Componente {
    constructor(id, categoria, marca, nombre, precio) {
        this.id = id,
            this.categoria = categoria,
            this.marca = marca,
            this.nombre = nombre,
            this.precio = precio
        this.cantidad = 1
    }
    mostrarInfoComp() {
        console.log(`Este componente es de la categoría ${this.categoria}, es fabricado por la marca ${this.marca}, su nombre es ${this.nombre} y su precio es de $${this.precio}`)
    }
    sumarUnidad() {
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    restarUnidad() {
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}

//Creando el Array para los Componentes como Productos
let productos = []

const busquedaProductos = [].concat(productos)

let carrito = []


//Declarando elementos del DOM capturados
let botonBuscar = document.getElementById("botonBuscar")
let inputBuscar = document.getElementById("inputBuscar")
let catalogo = document.getElementById("catalogo")
let btnRadio1 = document.getElementById("btnradio1")
let btnRadio2 = document.getElementById("btnradio2")
let btnRadio3 = document.getElementById("btnradio3")
let btnCarrito = document.getElementById("btnCarrito")
let modalBody = document.getElementById("modal-body")
let precioTotal = document.getElementById("precioTotal")
let btnComprar = document.getElementById("btnComprar")

//peticion de la API local de productos metodo async- await
const crearProductos = async () => {
    const res = await fetch("./js/productos.json")
    const info = await res.json()

    for (let componente of info) {
        let componenteInfo = new Componente(componente.id, componente.categoria, componente.marca, componente.nombre, componente.precio)
        productos.push(componenteInfo)
    }
    localStorage.setItem("productos", JSON.stringify(productos))
    mostrarCatalogo(productos)
}

if (localStorage.getItem("productos")) {
    productos = JSON.parse(localStorage.getItem("productos"))
    mostrarCatalogo(productos)
} else {
    crearProductos()
}


//Aplicando Evento Click al Buscador
botonBuscar.onclick = (e) => {
    e.preventDefault()
    buscarProducto(busquedaProductos)
}

//Evento Click para ordenar de menor a mayor
btnRadio1.addEventListener("click", () => {
    ordMenorMayor(busquedaProductos)
})

//Evento Click para ordenar de Mayor a menor
btnRadio2.addEventListener("click", () => {
    ordMayorMenor(busquedaProductos)
})

btnRadio3.addEventListener("click", () => {
    ordAlfabeticamente(busquedaProductos)
})
//Evento click para el carrito
btnCarrito.addEventListener("click", () => {
    mostrarProductoCarrito(carrito)
})

//Evento para finalizar la compra
btnComprar.addEventListener("click", () => {
    finalizarCompra()
})

//Funcion para buscar en el catalogo con el metodo filter
function buscarProducto(array) {
    catalogo.innerHTML = ``
    let busqueda = array.filter(
        (elemento) => elemento.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase()) || elemento.marca.toLowerCase().includes(inputBuscar.value.toLowerCase()))
    busqueda.length == 0 ? alert(`No se pudo encontrar ${inputBuscar.value}`) : mostrarCatalogo(busqueda)
}

//Ordenar de Menor a Mayor por los precios
function ordMenorMayor(array) {
    array.sort((a, b) => a.precio - b.precio)
    mostrarCatalogo(array)
}

//Ordenar de Mayor a Menor por los precios
function ordMayorMenor(array) {
    array.sort((a, b) => b.precio - a.precio)
    mostrarCatalogo(array)
}

//Ordenar alfabeticamente por las marcas
function ordAlfabeticamente(array) {
    array.sort((a, b) => {
        if (a.marca > b.marca) {
            return 1
        }
        if (a.marca < b.marca) {
            return -1
        }
        return 0
    })
    mostrarCatalogo(array)
}



//Funcion agregar al carrito
function agregarAlCarrito(producto) {
    let productoAgregado = carrito.find((el) => el.id == producto.id)
    if (productoAgregado == undefined) {
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    } else {
        console.log("ya existe el producto en el carrito")
        let productoSuma = carrito.find((el) => el.id == producto.id)
        console.log(`Se suma una unidad de ${productoSuma.nombre}`)
        productoSuma.sumarUnidad()
    }
    console.log(carrito)
}

//creando el storage para el carrito
    if (localStorage.getItem("carrito")) {
        for (let producto of JSON.parse(localStorage.getItem("carrito"))) {
            let productoStorage = new Componente(producto.cantidad, producto.id, producto.nombre, producto.marca, producto.precio)
            carrito.push(productoStorage)
        }
    } else {
        carrito = []
        localStorage.setItem("carrito", carrito)
    }


function finalizarCompra() {
    modalBody.innerHTML = ""
    if (carrito.length > 0) {
        swal({
            icon: 'success',
            title: 'Compra realizada con exito',
            text: 'Muchas gracias por elegirnos'
        })
        carrito = []
        localStorage.removeItem("carrito")
    } else {
        swal({
            icon: 'warning',
            title: 'No se pudo realizar la compra',
            text: 'No se pudo realizar la compra porque el carrito se encuentra vacío'
        })
    }

    if (localStorage.getItem("carrito")) {
        for (let producto of JSON.parse(localStorage.getItem("carrito"))) {
            let productoStorage = new Componente(producto.cantidad, producto.id, producto.nombre, producto.marca, producto.precio)
            return carrito.push(productoStorage)
        }
    } else {
        carrito = []
        return localStorage.setItem("carrito", carrito)
    }
}

function mostrarProductoCarrito(array) {
    modalBody.innerHTML = ``
    //imprime los productos agregados al carrito
    array.forEach((productoCarrito) => {
        modalBody.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
        <img class="card-img-top" height="300px" src="" alt="">
        <div class="card-body">
            <h4 class="card-title">${productoCarrito.nombre}</h4>
            <p class="card-text">${productoCarrito.marca}</p>
                <p class="card-text">$${productoCarrito.precio}</p>
                <p class="card-text">Precio unitario $${productoCarrito.precio}</p>
                <p class="card-text">Total de unidades ${productoCarrito.cantidad}</p> 
                <p class="card-text">SubTotal ${productoCarrito.cantidad * productoCarrito.precio}</p>   
                <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>
                <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button>
                <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}">
                Borrar
                </button>
        </div>    
    </div>`
    })
    array.forEach((productoCarrito) => {
        //evento para sumar unidad
        document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", () => {
            console.log(`Se suma una unidad de ${productoCarrito.nombre}`)
            productoCarrito.sumarUnidad()
            localStorage.setItem("carrito", JSON.stringify(array))
            mostrarProductoCarrito(array)
        })
        //EVENTO PARA RESTAR UNA UNIDAD
        document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", () => {
            let cantProd = productoCarrito.restarUnidad()
            console.log(cantProd)
            if (cantProd < 1) {
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let productoEliminar = array.find((producto) => producto.id == productoCarrito.id)
                let posicion = array.indexOf(productoEliminar)
                array.splice(posicion, 1)
                localStorage.setItem("carrito", JSON.stringify(array))
                console.log(`Se quita del carrito ${productoCarrito.nombre}`)
                calcularTotal(array)
            }
            else {
                localStorage.setItem("carrito", JSON.stringify(array))
                console.log(`Se resta una unidad de ${productoCarrito.nombre}`)
            }
            mostrarProductoCarrito(array)
        })
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            console.log(`Eliminar producto`)
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let productoEliminar = array.find((producto) => producto.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))
            calcularTotal(array)
        })
    })
    calcularTotal(array)

}

function calcularTotal(array) {
    let sumaTotal = array.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    sumaTotal == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` : precioTotal.innerHTML = `El total es: <strong>$${sumaTotal}</strong> `
}

//mostrando el catalogo de componentes
function mostrarCatalogo(array) {
    catalogo.innerHTML = ``
    for (let producto of array) {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.className = "col-12 col-md-6 col-lg-3 my-2"
        nuevoProducto.innerHTML = `<div id="${producto.id}" class="card" style="width: 18rem;">
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${producto.nombre}</h5>
<h6 class="card-title">$${producto.precio}</h6>
<p class="card-text">${producto.marca}</p>
<button id="btnAgregar${producto.id}" class="btn btn-primary">Añadir al Carro</button>
</div>
</div>`
        catalogo.appendChild(nuevoProducto)

        let btnAgregarCarrito = document.getElementById(`btnAgregar${producto.id}`)
        // console.log(btnAgregarCarrito)
        btnAgregarCarrito.addEventListener("click", function () {
            agregarAlCarrito(producto)
        })
    }
}
