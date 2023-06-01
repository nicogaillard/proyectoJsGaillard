// Comienzo de la primer pre entrega JS
//Declarando variables
let nombreUsuario 
let apellidoUsuario
let valor




//"Logueo" del usuario que determina si puede acceder al menú
nombreUsuario = prompt("Ingrese su nombre")
apellidoUsuario = prompt("Ahora ingrese su apellido")

// Condicional respecto al "Logueo" anterior para acceder al menú
if (((nombreUsuario != "") && (apellidoUsuario != "")) && ((nombreUsuario != null) && (apellidoUsuario != null))){
    alert(`Bienvenido ${nombreUsuario} ${apellidoUsuario} a la tienda de componentes de PC.
    A continuación le mostraremos una serie de opciones enumeradas.`)
    //llamado a la función menú
    menu()
}else {
    alert("No ingresó correctamente Nombre y/o Apellido, vuelva a intentarlo.")
}


//Funcion menú

function menu() {
    valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
    1. Lista de componentes
    2. Estimador de costos
    3. Información extra
    0. Salir del Menú`)

    while (valor != "ESC") {
        switch (valor) {
            case "1":
                alert(`Mother Asus `)
            break
            case "2":
                alert("El producto seleccionado es PAPA")
            break
            case "3":
                alert("El producto seleccionado es CARNE")
            break
            case "0":
                valor = "ESC"
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