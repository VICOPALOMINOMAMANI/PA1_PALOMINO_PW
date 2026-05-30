import { useState, useEffect } from 'react'; // Agregamos useEffect aquí
import './Catalogo.css';

function Catalogo() {
  // 1. Array de productos corregido sin errores de sintaxis
  const productos = [
    { nombre: 'Taladro Industrial', precio: 399, imagen: '/productos/p1.jpg' },
    { nombre: 'Martillo Profesional', precio: 59, imagen: '/productos/p2.jpg' },
    { nombre: 'Caja de Herramientas', precio: 149, imagen: '/productos/p3.jpg' },
    { nombre: 'Pintura Látex', precio: 89, imagen: '/productos/p4.jpg' },
    { nombre: 'Juego de Llaves', precio: 120, imagen: '/productos/p5.jpg' },
    { nombre: 'Escalera Metálica', precio: 299, imagen: '/productos/p6.jpg' },
    { nombre: 'Rotomartillo', precio: 450, imagen: '/productos/p7.jpg' },
    { nombre: 'Compresora', precio: 799, imagen: '/productos/p8.jpg' },
    { nombre: 'Cemento', precio: 35, imagen: '/productos/p9.jpg' },
    { nombre: 'Brochas Profesionales', precio: 25, imagen: '/productos/p10.jpg' },
    { nombre: 'Sierra Circular', precio: 560, imagen: '/productos/p11.jpg' },
    { nombre: 'Guantes de Seguridad', precio: 18, imagen: '/productos/p12.jpg' },
    { nombre: 'Carretilla', precio: 220, imagen: '/productos/p13.jpg' },
    { nombre: 'Soldadora', precio: 990, imagen: '/productos/p14.jpg' },
    { nombre: 'Lijadora', precio: 280, imagen: '/productos/p15.jpg' },
    { nombre: 'Cinta Métrica', precio: 15, imagen: '/productos/p16.jpg' }
  ];

  // 2. Estados para el carrito con persistencia en LocalStorage
  const [carrito, setCarrito] = useState(() => {
    // Al cargar la página, verificamos si ya había productos guardados
    const carritoGuardado = localStorage.getItem('ferrecenter_cart');
    // Si hay productos, los convertimos de texto a array. Si no, empezamos vacío []
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Guardar automáticamente en el navegador cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('ferrecenter_cart', JSON.stringify(carrito));
  }, [carrito]);
  
  // Función para agregar productos (evita duplicados incrementando cantidad)
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

  // Función para eliminar un artículo por completo
  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  // Cálculos totales para los indicadores numéricos
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
          {/* LOGO */}
          <a className="navbar-brand logo" href="/">
            FERRVICENTER
          </a>

          {/* BOTÓN CELULAR */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENÚ */}
          <div className="collapse navbar-collapse" id="menu">
            {/* BUSCADOR */}
            <form className="d-flex mx-auto search-box">
              <input className="form-control" type="search" placeholder="Buscar productos" />
              <button className="btn btn-warning" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            {/* OPCIONES */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#productos">Productos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#ofertas">Ofertas</a>
              </li>

              {/* BOTÓN DEL CARRITO CON NUMERACIÓN */}
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

                {/* VENTANA PEQUEÑA (DROPDOWN DE CARRITO PROFESIONAL) */}
                {mostrarCarrito && (
                  <div className="carrito-dropdown shadow-lg rounded-3 border bg-white position-absolute end-0 mt-2 p-3">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
                      <h6 className="m-0 fw-bold text-dark">Mi Carrito</h6>
                      <button 
                        onClick={() => setMostrarCarrito(false)} 
                        className="btn-close small" 
                        type="button"
                      ></button>
                    </div>

                    <div className="carrito-items-container">
                      {carrito.length === 0 ? (
                        <p className="text-muted text-center py-4 my-0">El carrito está vacío.</p>
                      ) : (
                        carrito.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center mb-3 justify-content-between">
                            <img src={item.imagen} alt={item.nombre} className="img-thumbnail me-2" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                            <div className="flex-grow-1 min-w-0 me-2">
                              <h6 className="my-0 text-truncate small fw-bold">{item.nombre}</h6>
                              <small className="text-muted">
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

      {/* HEADER */}
      <div className="catalogo-header">
        <div className="container">
          <h1>Catálogo de Productos</h1>
          <p>Encuentra herramientas y materiales de calidad</p>
        </div>
      </div>

      {/* SECCIÓN PRODUCTOS */}
      <div className="container py-5" id="productos">
        <div className="row g-4">
          {productos.map((producto, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="catalogo-card h-100 d-flex flex-column justify-content-between shadow-sm rounded border">
                <div>
                  <img src={producto.imagen} alt={producto.nombre} className="catalogo-img w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  <div className="catalogo-body p-3">
                    <h5 className="fs-6 text-dark fw-bold">{producto.nombre}</h5>
                    <p className="precio text-amber fw-bold mb-0">S/{producto.precio}</p>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <button
                    type="button"
                    className="btn btn-warning w-100 fw-bold transition-all"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    <i className="bi bi-plus-lg me-1"></i> Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN OFERTAS */}
      <section className="offer-banner py-5" id="ofertas">
        <div className="container text-center text-white">
          <h2 className="display-5 fw-bold mb-3">Hasta 40% de descuento</h2>
          <p className="lead mb-4">Aprovecha nuestras ofertas especiales</p>
          <button className="btn btn-warning btn-lg fw-bold">Ver ofertas</button>
        </div>
      </section>
    </>
  );
}

export default Catalogo;
