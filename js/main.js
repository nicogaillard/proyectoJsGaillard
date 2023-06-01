// Comienzo de la primer pre entrega JS
//Declarando variables
let nombreUsuario 
let apellidoUsuario
let valor




//
nombreUsuario = prompt("Ingrese su nombre")
apellidoUsuario = prompt("Ahora ingrese su apellido")
console.log(nombreUsuario)
console.log(apellidoUsuario)

if (((nombreUsuario != "") && (apellidoUsuario != "")) && ((nombreUsuario != null) && (apellidoUsuario != null))){
    valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
    1. Lista de componentes
    2. Estimador de costos
    3. Información extra
    0. Salir del Menú`)

    while (valor != "ESC") {
        switch (valor) {
            case "1":
                alert("El producto seleccionado es TOMATE")
            break
            case "2":
                alert("El producto seleccionado es PAPA")
            break
            case "3":
                alert("El producto seleccionado es CARNE")
            break
            case "0":
                valor = "ESC"
            break
            default:
                alert("ERROR, ingrese un número según corresponda")
            break
        }
        // valor = prompt(`Ingrese un número según la opción a la que desee ingresar:
        // 1. Lista de componentes
        // 2. Estimador de costos
        // 3. Información extra
        // 0. Salir del Menú`)
    }
}else {
    alert("No ingresó correctamente Nombre y/o Apellido, vuelva a intentarlo.")
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