class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

function inicializarSelect() {
    const select = document.getElementById("selectOrden");
    select.addEventListener("change", () => {
        const value = select.value;
        switch(value) {
            case 'precio':
                ordenarPorPrecio();
                break;
            case 'nombre':
                break;
        }
    });
}

function inicializarInput() {
    const input = document.getElementById("buscarProducto");
    input.addEventListener("keyup", () => {
        const value = input.value;
        const productosFiltrados = listadoDeProductos.filter( (producto) => {
            return producto
                .nombre
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                );
        });
        renderizarProductos(productosFiltrados);

    });
}

function eliminarProducto(producto) {
    const indiceProductoAEliminar = carrito.findIndex( (el) => {
        return producto.nombre === el.nombre;
    });
    if(indiceProductoAEliminar !== -1) {
        carrito.splice(indiceProductoAEliminar, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarTablaCarrito(carrito);
    }
}

function obtenerProductosEnLS() {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    if(carrito) {
        renderizarTablaCarrito(carrito);
    }
}

function ordenarPorPrecio() {
    const productosOrdenados = listadoDeProductos.sort( (productoA, productoB) => {
        if(productoA.precio < productoB.precio) {
            return 1;
        } else if(productoA.precio > productoB.precio) {
            return -1;
        }
        return 0;
    });
    renderizarProductos(productosOrdenados);
}

function guardarProductoEnLS(producto, cantidad) {
    const productoAAgregar = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(cantidad),
    };

    if(carrito === null) {
        carrito = [productoAAgregar];
    } else {
        const indiceExisteProducto = carrito.findIndex( (el) => {
            return el.nombre === productoAAgregar.nombre;
        });
        if(indiceExisteProducto === -1) {
            carrito.push(productoAAgregar);
        } else {
            carrito[indiceExisteProducto].cantidad += parseInt(cantidad);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarTablaCarrito(carrito);
}

function renderizarTablaCarrito(productosCarrito) {
    const tbody = document.querySelector("#carrito table tbody");
    tbody.innerHTML = "";
    for(const productoCarrito of productosCarrito) {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        tdNombre.innerText = productoCarrito.nombre;
        const tdPrecio = document.createElement("td");
        tdPrecio.innerText = `$${productoCarrito.precio}`;
        const tdCantidad = document.createElement("td");
        tdCantidad.innerText = productoCarrito.cantidad;
        const tdEliminar = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(productoCarrito);
        });
        tdEliminar.append(botonEliminar);
        tr.append(tdNombre, tdPrecio, tdCantidad, tdEliminar);
        tbody.append(tr);
    }
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    for(const producto of productos) {

        const divPadre = document.createElement("div");
        divPadre.className = "col-12 col-sm-4 mb-2";

        const divCard = document.createElement("div");
        divCard.className = "card";

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        const h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = producto.nombre;

        const p = document.createElement("p");
        p.className = "card-text";
        p.innerHTML = `<strong>Precio:</strong> $${producto.precio} - <strong>Stock:</strong> ${producto.stock}`;

        const divAgregarAlCarrito = document.createElement("div");
        divAgregarAlCarrito.className = "d-flex align-items-center";

        const button = document.createElement("button");
        button.className = "btn btn-primary flex-shrink-0 me-3";
        button.innerText = "Agregar al carrito";

        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.className = "form-control";
        inputCantidad.value = 1;

        button.addEventListener("click", () => {
            const cantidad = inputCantidad.value;
            if(cantidad > producto.stock) {
                alert("NO HAY SUFICIENTE STOCK");
            } else {
                guardarProductoEnLS(producto, cantidad);
            }
        });
        divAgregarAlCarrito.append(button, inputCantidad);
        divCardBody.append(h5, p, divAgregarAlCarrito);
        divCard.append(divCardBody);
        divPadre.append(divCard);
        contenedor.append(divPadre);
    }
}

const listadoDeProductos = [
    new Producto("Arroz", 200, 2),
    new Producto("Pan", 500, 5),
    new Producto("Leche", 700, 10),
    new Producto("Harina", 300, 2),
    new Producto("Café", 1000, 4),
];
let carrito = [];

renderizarProductos(listadoDeProductos);
inicializarInput();
inicializarSelect();
obtenerProductosEnLS();
