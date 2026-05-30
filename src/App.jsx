import { useState, useEffect } from 'react';
import './App.css'; // Mantenemos tus estilos originales

function App() {
  // 1. Array de productos de App.jsx corregido
  const productos = [
    {
      nombre: 'Taladro Industrial',
      precio: 399, // Cambiado a número para poder sumar totales de forma profesional
      imagen: '/productos/p1.jpg',
      categoria: 'Herramientas'
    },
    {
      nombre: 'Caja de Herramientas',
      precio: 149,
      imagen: '/productos/p3.jpg',
      categoria: 'Organización'
    },
    {
      nombre: 'Sierra Circular',
      precio: 560,
      imagen: '/productos/p11.jpg',
      categoria: 'Construcción'
    },
    {
      nombre: 'Soldadora',
      precio: 990,
      imagen: '/productos/p14.jpg',
      categoria: 'Industrial'
    }
  ];

  // 2. Estado persistente del carrito (Intenta leer de localStorage al iniciar)
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('ferrecenter_cart');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  
  // Estado para controlar la visibilidad de la ventana del carrito
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // 3. Efecto para guardar en localStorage automáticamente cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('ferrecenter_cart', JSON.stringify(carrito));
  }, [carrito]);

  // 4. Funciones del carrito interactivo
  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return carritoActual.map((item) =>
          item.nombre === producto.nombre ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  // Cálculos dinámicos numéricos
  const cantidadTotal = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  const precioTotal = carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="container d-flex justify-content-between">
          <span>
            <i className="bi bi-geo-alt"></i> Arequipa, Perú
          </span>
          <span>
            <i className="bi bi-truck"></i> Envíos a todo el país
          </span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark main-navbar sticky-top">
        <div className="container position-relative">
          <a className="navbar-brand logo" href="#">
            FERRECENTER
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menu">
            {/* BUSCADOR */}
            <form className="d-flex mx-auto search-box">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar productos"
              />
              <button className="btn btn-warning" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
            {/* MENÚ */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#productos">
                  Productos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#ofertas">
                  Ofertas
                </a>
              </li>
              
              {/* INTERACTIVIDAD DEL BOTÓN DEL CARRITO */}
              <li className="nav-item ms-3 position-relative">
                <button
                  onClick={() => setMostrarCarrito(!mostrarCarrito)}
                  className="btn btn-warning cart-btn position-relative"
                  type="button"
                >
                  <i className="bi bi-cart3"></i>
                  {cantidadTotal > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidadTotal}
                    </span>
                  )}
                </button>

                {/* VENTANA FLOTANTE PEQUEÑA DEL CARRITO DESPLEGABLE */}
                {mostrarCarrito && (
                  <div className="carrito-dropdown shadow-lg rounded-3 border bg-white position-absolute end-0 mt-2 p-3" style={{ width: '320px', zIndex: 1050 }}>
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                      <h6 className="m-0 fw-bold text-dark">Mi Carrito</h6>
                      <button 
                        onClick={() => setMostrarCarrito(false)} 
                        className="btn-close small" 
                        type="button"
                      ></button>
                    </div>

                    <div className="carrito-items-container" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {carrito.length === 0 ? (
                        <p className="text-muted text-center py-4 my-0">El carrito está vacío.</p>
                      ) : (
                        carrito.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-3 justify-content-between">
                            <img src={item.imagen} alt={item.nombre} className="img-thumbnail me-2" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                            <div className="flex-grow-1 min-w-0 me-2">
                              <h6 className="my-0 text-truncate small fw-bold text-dark text-start">{item.nombre}</h6>
                              <small className="text-muted d-block text-start">
                                {item.cantidad} x S/{item.precio}
                              </small>
                            </div>
                            <button
                              onClick={() => eliminarDelCarrito(item.nombre)}
                              className="btn btn-sm btn-outline-danger border-0 p-1"
                              type="button"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {carrito.length > 0 && (
                      <div className="border-top pt-2 mt-2">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold text-secondary">Total:</span>
                          <span className="fw-bold text-dark h5 mb-0">S/{precioTotal}</span>
                        </div>
                        <button className="btn btn-warning w-100 fw-bold btn-sm">
                          Procesar Compra
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white">
              <span className="badge bg-warning text-dark mb-3 p-2">
                NUEVAS OFERTAS
              </span>
              <h1 className="display-3 fw-bold mb-4">
                Todo para tu hogar y construcción
              </h1>
              <p className="lead mb-4">
                Encuentra herramientas, pinturas,
                electricidad y materiales de calidad.
              </p>
              <button className="btn btn-warning btn-lg me-3">
                Comprar ahora
              </button>
              <a href="/catalogo" className="btn btn-outline-light btn-lg">
                Ver catálogo
              </a>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                alt="Ferretería"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="container py-5">
        <h2 className="section-title mb-5 text-center">
          Categorías Populares
        </h2>
        <div className="row g-4">
          <div className="col-md-3">
            <div className="category-card">
              <i className="bi bi-tools"></i>
              <h5>Herramientas</h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="category-card">
              <i className="bi bi-lightning"></i>
              <h5>Electricidad</h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="category-card">
              <i className="bi bi-brush"></i>
              <h5>Pinturas</h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="category-card">
              <i className="bi bi-house"></i>
              <h5>Construcción</h5>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="products-section py-5" id="productos">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="section-title">
              Productos Destacados
            </h2>
            <a href="/catalogo" className="btn btn-dark">
              Ver todos
            </a>
          </div>
          <div className="row g-4">
            {productos.map((producto, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="product-card">
                  <div className="product-image-container">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="product-image"
                    />
                  </div>
                  <div className="product-body">
                    <span className="product-category">
                      {producto.categoria}
                    </span>
                    <h5 className="product-title">
                      {producto.nombre}
                    </h5>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="product-price">
                        S/{producto.precio}
                      </span>
                      {/* Botón interactivo que ejecuta la función de guardado */}
                      <button
                        className="btn btn-warning"
                        onClick={() => agregarAlCarrito(producto)}
                        type="button"
                      >
                        <i className="bi bi-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      <section className="offer-banner" id="ofertas">
        <div className="container text-center text-white">
          <h2 className="display-5 fw-bold mb-3">
            Hasta 40% de descuento
          </h2>
          <p className="lead mb-4">
            Aprovecha nuestras mejores ofertas.
          </p>
          <button className="btn btn-warning btn-lg">
            Ver ofertas
          </button>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4">
            <h2 className="section-title mb-4">
              Contáctanos
            </h2>
            <p>
              Escríbenos y uno de nuestros asesores
              responderá tus consultas.
            </p>
            <div className="contact-info">
              <p>
                <i className="bi bi-telephone-fill"></i> +51 999 999 999
              </p>
              <p>
                <i className="bi bi-envelope-fill"></i> contacto@ferrecenter.com
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-card">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Escribe tu mensaje"
                  ></textarea>
                </div>
                <button className="btn btn-warning w-100" type="button">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h4>FERRECENTER</h4>
              <p>
                Tu tienda online de herramientas y construcción.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Categorías</h5>
              <ul>
                <li>Herramientas</li>
                <li>Pinturas</li>
                <li>Electricidad</li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Redes Sociales</h5>
              <div className="social-icons">
                <i className="bi bi-facebook me-2"></i>
                <i className="bi bi-instagram me-2"></i>
                <i className="bi bi-whatsapp"></i>
              </div>
            </div>
          </div>
          <hr />
          <p className="text-center mb-0">
            2026 FERRECENTER - Todos los derechos reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;