//Declarando variables
let nombreUsuario
let apellidoUsuario

//class constructora de objetos pc
class Componente {
    constructor(id, categoria, marca, nombre, precio) {
        this.id = id,
            this.categoria = categoria,
            this.marca = marca,
            this.nombre = nombre,
            this.precio = precio
    }
    mostrarInfoComp() {
        console.log(`Este componente es de la categoría ${this.categoria}, es fabricado por la marca ${this.marca}, su nombre es ${this.nombre} y su precio es de $${this.precio}`)
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

//funcion agregar producto
function agregarProducto() {
    let categoriaIngresada = prompt("Ingrese la Categoria del producto")
    let marcaIngresada = prompt("Ingrese la Marca del producto")
    let nombreIngresado = prompt("Ingrese el Nombre del Producto")
    let precioIngresado = parseInt(prompt("Ingrese el Precio del Producto"))
    //Creando el objeto con los valores ingresados
    const componenteNuevo = new Componente(productos.length + 1, categoriaIngresada, marcaIngresada, nombreIngresado, precioIngresado)
    componenteNuevo.mostrarInfoComp()
    console.log(componenteNuevo)
    //Agregando el objeto al array
    productos.push(componenteNuevo)
    console.log(productos)
}

//Funcion para recorrer el catalogo e imprimirlo en consola
function verCatalogo(array) {
    console.log("Nuestros productos son:")
    for (let elemento of array) {
        console.log(elemento.id, elemento.categoria, elemento.marca, elemento.nombre, elemento.precio)
    }
}

//Funcion para buscar en el catalogo con el metodo find 
function buscarPorMarca(array) {
    let marcaBuscada = prompt(`Ingrese el nombre de la marca que desea buscar`)
    let busqueda = array.find(
        (elemento) => elemento.marca.toLowerCase() === marcaBuscada.toLowerCase()
    )
    if (busqueda == undefined) {
        console.log(`La marca ${marcaBuscada} no se encuentra en nuestro catálogo`)
    } else {
        console.log(busqueda)
    }
}

//Funcion para buscar en el catalogo con el metodo filter
function buscarPorCategoria(array) {
    let categoriaBusqueda = prompt("Ingrese la categoria de los productos que está buscando")
    let busqueda = array.filter(
        (elemento) => elemento.categoria.toLowerCase() === categoriaBusqueda.toLowerCase()
    )
    if (busqueda.length == 0) {
        console.log(`Para la categoría ${categoriaBusqueda} no hay coincidencias en nuestro catalogo`)
    } else {
        verCatalogo(busqueda)
    }
}

//Ordenar de Menor a Mayor por los precios
function ordMenorMayor(array) {
    const menorMayor = [].concat(array)
    console.log(menorMayor)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

//Ordenar de Mayor a Menor por los precios
function ordMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)
}

//Ordenar alfabeticamente por las marcas
function ordAlfabeticamente(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {
        if (a.marca > b.marca) {
            return 1
        }
        if (a.marca < b.marca) {
            return -1
        }
        return 0
    })
    verCatalogo(arrayAlfabetico)
}

function ordCatalogo() {
    let opcion = parseInt(prompt(`
    1 - Ordenar de menor a mayor
    2 - Ordenar de mayor a menor
    3 - Ordenar alfabeticamente por la marca del producto`))
    switch (opcion) {
        case 1:
            ordMenorMayor(productos)
            break
        case 2:
            ordMayorMenor(productos)
            break
        case 3:
            ordAlfabeticamente(productos)
            break
        default:
            console.log(`La opcion ${opcion} no es válida`)
            break
    }
}

//"Logueo" del usuario que determina si puede acceder al menú
//logueo()
function logueo() {
    nombreUsuario = prompt("Ingrese su nombre")
    apellidoUsuario = prompt("Ahora ingrese su apellido")
    // Condicional respecto al "Logueo" anterior para acceder al menú
    if (((nombreUsuario != "" && apellidoUsuario != "") && (nombreUsuario != null && apellidoUsuario != null)) && (isNaN(nombreUsuario) && isNaN(apellidoUsuario))) {
        alert(`Bienvenido ${nombreUsuario} ${apellidoUsuario} a la tienda de componentes de PC.
A continuación le mostraremos una serie de opciones enumeradas.`)
        //llamado a la función menú
        menu()
    } else {
        alert("No ingresó correctamente Nombre y/o Apellido, vuelva a intentarlo.")
        //Llamado a funcion logueo para reingresar nombre y apellido
        logueo()
    }
}

//Funcion menú
function menu() {
    valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
    1. Lista de componentes
    2. Agregar un componente
    3. Buscar por marca
    4. Buscar por categoria
    5. Ordenar el catálogo
    0. Salir del Menú`)

    while (valor != "0") {
        switch (valor) {
            case "1":
                verCatalogo(productos)
                break
            case "2":
                agregarProducto()
                break
            case "3":
                buscarPorMarca(productos)
                break
            case "4":
                buscarPorCategoria(productos)
                break
            case "5":
                ordCatalogo()
                break
            default:
                alert("ERROR, ingrese un número según corresponda")
                break
        }
        valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
        1. Lista de componentes
        2. Agregar un componente
        3. Buscar por marca
        4. Buscar por categoria
        5. Ordenar catálogo
        0. Salir del Menú`)
    }
    alert("Gracias por visitar nuestro sitio.")
}