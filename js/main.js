// Comienzo de la primer pre entrega JS
//Declarando variables
let nombreUsuario
let apellidoUsuario
let valor
let mother = 42500
let procesador = 69800
let ram = 25000
let totalPrecio = ram + procesador + mother
let tresCtasMyV = totalPrecio * 1.15
let seisCtasMyV = totalPrecio * 1.30
let tresCtasMax = totalPrecio * 1.10

//"Logueo" del usuario que determina si puede acceder al menú
logueo()
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
    2. Metodos de pago
    3. Información extra
    0. Salir del Menú`)

    while (valor != "0") {
        switch (valor) {
            case "1":
                alert(`Los componentes disponibles son:
Mother Asus $${mother}
Procesador intel $${procesador}
Memoria ram 16gb DDR4 $${ram}

El total de la suma de los componentes es $${totalPrecio}`)
                break
            case "2":
                alert(`Los metodos de pagos son:
-Efectivo, transferencia o débito $${totalPrecio}

-VISA o MasterCard: 
-1 pago sin interés
-3 cuotas con un 15% $${tresCtasMyV}
-6 cuotas con un 30% $${seisCtasMyV}

Naranja PLAN Z:
-11 cuotas con 15% $${tresCtasMyV}

Consumax PLAN MAX:
-3 cuotas con un 10% $${tresCtasMax}`)
                break
            case "3":
                alert("Este combo permite al usuario utilizar unos componentes de maxima calidad y rendimiento a un costo relativamente accesible.")
                break
            default:
                alert("ERROR, ingrese un número según corresponda")
                break
        }
        valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
        1. Lista de componentes
        2. Estimador de costos
        3. Información extra
        0. Salir del Menú`)
    }
    alert("Gracias por visitar nuestro sitio.")
}































//  Funcion de calculo de año de jubilación

// function correr() {
//     let apellido = prompt("Por favor ingrese su Apellido")
//     let nombre = prompt("Ahora ingrese su nombre")
//     let edad = parseInt(prompt("¿Cuál es su edad?"))
//     let anioActual = 2023
//     let jubilacion = 65

//     let calculo = + jubilacion - + edad
//     let jubilo = + calculo + anioActual

//     alert("Hola "+ nombre + " " + apellido)
//     alert("Te vas a jubilar en el año " + jubilo)
// }