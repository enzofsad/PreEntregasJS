function mostrarTotal(){
    alert ("El total es: " + total + " pesos")
}
function agregarProducto(){
    let producto = prompt("Ingrese de producto / Queso - 1 / Leche - 2 / Manteca - 3 / Crema - 4 / Yogurt - 5 / Vaciar Carrito - 9 / SALIR - 0");
    while(producto !== "0"){
        switch(producto){
            case "1":
                total += 45;
            break;
            case "2":
                total += 28;
            break;
            case "3":
                total += 67;
            break;
            case "4":
                total += 94;
            break;
            case "5":
                total += 31;
            break;
            case "9":
                total = 0;
            break;
            default:
                alert("Producto no disponible")
            break;
            }
        producto = prompt("Ingrese de producto / Queso - 1 / Leche - 2 / Manteca - 3 / Crema - 4 / Yogurt - 5 / Vaciar Carrito - 9 / SALIR - 0");
    }
}
let nombreProducto = "";
let total = 0;
let operacion = prompt ("Elija operación a reaizar / Agregar productos - 1 / Ver total - 2 / SALIR - 0");
while (operacion !=="0"){
    switch(operacion){
        case "1":
            agregarProducto();
        break;
        case "2":
            mostrarTotal();
        break;
        default:
            alert("Opción no válida")
        break;
    }
    operacion = prompt ("Elija operación a reaizar / Agregar productos - 1 / Ver total - 2 / SALIR - 0");
}
alert("GRACIAS, VUELVA PRONTO");