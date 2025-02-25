document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del archivo actual
    const pagina = window.location.pathname.split("/").pop();

    // Definir categoría según la página
    let categoria = "";

    if (pagina.includes("destinos.html")) {
        categoria = "smartphones"; // Equipos de viaje
    } else if (pagina.includes("galeria.html")) {
        categoria = "laptops"; // Cámaras y gadgets
    } else if (pagina.includes("contacto.html")) {
        categoria = "fragrances"; // Perfumes y accesorios
    } else {
        categoria = "random"; // Mostrar cualquier producto
    }

    // Construir la URL de la API según la categoría
    let apiUrl = "https://dummyjson.com/products";
    if (categoria !== "random") {
        apiUrl = `https://dummyjson.com/products/category/${categoria}`;
    }

    // Hacer la petición a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const productos = data.products;
            const productoAleatorio = productos[Math.floor(Math.random() * productos.length)];

            // Crear el contenedor del producto
            const contenedor = document.createElement("div");
            contenedor.classList.add("publicidad");

            contenedor.innerHTML = `
                <h3>🌟 Publicidad Relacionada</h3>
                <img src="${productoAleatorio.thumbnail}" alt="${productoAleatorio.title}" />
                <p><strong>${productoAleatorio.title}</strong></p>
                <p>${productoAleatorio.description}</p>
                <p><strong>Precio: $${productoAleatorio.price}</strong></p>
                <a href="${productoAleatorio.url}" target="_blank" class="btn">Ver Producto</a>
            `;

            // Insertar la publicidad antes del footer
            document.body.insertBefore(contenedor, document.querySelector("footer"));
        })
        .catch(error => console.error("Error al obtener los productos:", error));
});
