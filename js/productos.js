const productosAsia = [
  // --- RAMEN Y COMIDA ---
  {
    id: 1,
    nombre: "Ramen Shin Ramyun Gourmet",
    categoria: "Comida",
    precio: 2500,
    imagen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop",
    descripcion: "Sopa de fideos instantáneos picantes tradicionales de Corea."
  },
  {
    id: 2,
    nombre: "Buldak Ramen Carbonara",
    categoria: "Comida",
    precio: 3200,
    imagen: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop",
    descripcion: "Fideos extremadamente picantes con un cremoso toque de queso y pollo."
  },
  {
    id: 3,
    nombre: "Nissin Cup Noodles Seafood",
    categoria: "Comida",
    precio: 2100,
    imagen: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&auto=format&fit=crop",
    descripcion: "Ramen en vaso con caldo de mariscos y trocitos de calamar."
  },
  {
    id: 4,
    nombre: "Udon Instantáneo Kitsune",
    categoria: "Comida",
    precio: 3500,
    imagen: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&auto=format&fit=crop",
    descripcion: "Fideos gruesos de udon acompañados de tofu frito sazonado."
  },
  {
    id: 5,
    nombre: "Sopa Miso Tradicional (3 pzs)",
    categoria: "Comida",
    precio: 2800,
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop",
    descripcion: "Sopa instantánea de pasta de soya con cebollín y algas wakame."
  },

  // --- SNACKS Y DULCES ---
  {
    id: 6,
    nombre: "Pocky Chocolate Original",
    categoria: "Snacks",
    precio: 1800,
    imagen: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop",
    descripcion: "Crujientes palitos de galleta bañados en rico chocolate con leche."
  },
  {
    id: 7,
    nombre: "Pocky Match Green Tea",
    categoria: "Snacks",
    precio: 1950,
    imagen: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop",
    descripcion: "Palitos de galleta cubiertos con crema de té verde matcha."
  },
  {
    id: 8,
    nombre: "Mochi surtido de Frutas (6 pzs)",
    categoria: "Snacks",
    precio: 4500,
    imagen: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
    descripcion: "Pasteles de arroz pegajoso rellenos de pasta de fresa y mango."
  },
  {
    id: 9,
    nombre: "Pepero Crunch de Almendras",
    categoria: "Snacks",
    precio: 1850,
    imagen: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&auto=format&fit=crop",
    descripcion: "Galletas alargadas con cobertura de chocolate y trozos de almendra."
  },
  {
    id: 10,
    nombre: "Dorayaki Relleno de Anko",
    categoria: "Snacks",
    precio: 2200,
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop",
    descripcion: "Bizcocho esponjoso japonés relleno de pasta dulce de poroto rojo."
  },
  {
    id: 11,
    nombre: "KitKat de Té Verde Matcha",
    categoria: "Snacks",
    precio: 3900,
    imagen: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop",
    descripcion: "Edición especial japonesa con cobertura sabor a matcha genuino."
  },
  {
    id: 12,
    nombre: "Galletas Hello Panda Fresa",
    categoria: "Snacks",
    precio: 1500,
    imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop",
    descripcion: "Mini galletas crujientes rellenas de crema dulce de frutilla."
  },

  // --- BEBIDAS ---
  {
    id: 13,
    nombre: "Ramune Sabor Original 200ml",
    categoria: "Bebidas",
    precio: 2400,
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop",
    descripcion: "Bebida gaseosa japonesa tradicional en botella de vidrio con canica."
  },
  {
    id: 14,
    nombre: "Ramune Sabor Frutilla 200ml",
    categoria: "Bebidas",
    precio: 2400,
    imagen: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop",
    descripcion: "Refresco con gas dulce y afrutado sabor a fresas de temporada."
  },
  {
    id: 15,
    nombre: "Boba Tea en Lata - Matcha",
    categoria: "Bebidas",
    precio: 2900,
    imagen: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&auto=format&fit=crop",
    descripcion: "Té de burbujas listo para tomar con perlas de tapioca reales."
  },
  {
    id: 16,
    nombre: "Boba Tea en Lata - Taro",
    categoria: "Bebidas",
    precio: 2900,
    imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop",
    descripcion: "Té de burbujas cremoso con sabor a raíz de taro y tapioca."
  },
  {
    id: 17,
    nombre: "Jugo Mogu Mogu Lychee",
    categoria: "Bebidas",
    precio: 1700,
    imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop",
    descripcion: "Jugo sabor a lichi con cubos masticables de coco (Nata de Coco)."
  },
  {
    id: 18,
    nombre: "Jugo Mogu Mogu Mango",
    categoria: "Bebidas",
    precio: 1700,
    imagen: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop",
    descripcion: "Refrescante bebida tropical de mango con trozos de jalea de coco."
  },
  {
    id: 19,
    nombre: "Pokka Té Verde Jasmine 500ml",
    categoria: "Bebidas",
    precio: 2100,
    imagen: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&auto=format&fit=crop",
    descripcion: "Té verde aromático infusionado con flores de jazmín sin azúcar."
  },
  {
    id: 20,
    nombre: "Calpis Refresco de Yogurt",
    categoria: "Bebidas",
    precio: 2600,
    imagen: "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=500&auto=format&fit=crop",
    descripcion: "Bebida láctea japonesa no carbonatada de sabor suave y ácido."
  }
];