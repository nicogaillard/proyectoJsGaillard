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
//Creando objetos
const componente1 = new Componente(1, "Procesador", "Intel", "i5-7400", 72000)
const componente2 = new Componente(2, "Placa Madre", "MSI", "H-310M PRO VDH PLUS", 56000)
const componente3 = new Componente(3, "Memoria RAM", "HyperX", "8gb ddr4 3200hz", 18000)
const componente4 = new Componente(4, "Fuente", "Asus", "MAG 500W Reales", 45000)
const componente5 = new Componente(5, "Placa de Video", "Asus", "GTX 1060 6gb", 67500)
const componente6 = new Componente(6, "Disco Duro", "Western Digital", "1TB WD Blue", 32000)

//Creando el Array para los Componentes como Productos
const productos = [componente1, componente2, componente3, componente4, componente5, componente6]

const busquedaProductos = [].concat(productos)

let carrito



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
    } else { console.log("ya existe el producto en el carrito") }
    console.log(carrito)
}

//
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    carrito = []
    localStorage.setItem("carrito", carrito)
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
                <button class="btn btn-danger" id="botonEliminar${productoCarrito.id}">
                Borrar
                </button>
        </div>    
    </div>`
    })
    array.forEach((productoCarrito) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let productoBorrado = document.getElementById(`productoCarrito${productoCarrito.id}`)
            productoBorrado.remove()
            let productoEliminar = array.find((producto) => producto.id == productoCarrito.id)
            let posicion = array.indexOf(productoEliminar)
            array.splice(posicion,1)
            localStorage.setItem("carrito", JSON.stringify(array))
        })
    })
    calcularTotal(carrito)
    //
}

function calcularTotal(array){
    let sumaTotal = array.reduce((acc, producto)=> acc + producto.precio * producto.cantidad , 0)
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
mostrarCatalogo(productos)