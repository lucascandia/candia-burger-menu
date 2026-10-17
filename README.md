# Candia Burger - Menú digital

Menú digital de **Candia Burger** con carrito y pedido por WhatsApp. Desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## En producción

**URL:** [https://candia-burger-menu.vercel.app/](https://candia-burger-menu.vercel.app/)

## Características

- Tema oscuro con acentos naranja/rojo (marca "Fuego")
- Menú con 9 categorías: Hamburguesas, Lomitos Árabes, Otras Opciones, Papas, Combo Kids, Pizzas, Salsas, Bebidas y Cervezas
- Tarjetas con efecto hover (zoom de la foto, elevación y brillo naranja); emojis como fallback cuando no hay imagen
- Pizzas: se piden enteras o **mitad y mitad** con otro sabor (se cobra el sabor más caro)
- **Agregados** (carne, huevo, cheddar, katupiry, mozzarella, panceta; Gs. 4.000 c/u) en hamburguesas, lomitos, árabes y otras opciones
- Navegación por categorías con scroll suave y tab activo resaltado
- Carrito con Zustand (agrupación por producto, aclaraciones y agregados) y envío del pedido por WhatsApp
- Checkout con tipo de pedido (Comer en Local / Para Retirar / Delivery) y mensaje WhatsApp formateado
- Edición de cantidad, agregados y aclaraciones desde el resumen del pedido
- Salsas con precio por cantidad (1 pote: Gs. 2.000, 2: Gs. 3.000, 3: Gs. 5.000)
- Descripciones expandibles en productos con texto largo
- Footer con delivery y firma del desarrollador

## Dónde editar el menú

- Productos, precios y agregados: `data/menu.ts`
- Reglas de precio (mitad y mitad, agregados, salsas): `lib/pricing.ts`
- Fotos: `public/images/` (créditos de las fotos de terceros en `public/images/CREDITS.md`)
- Menús impresos de referencia: `reference/`

## Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (estado del carrito)
- **Lucide React** (iconos)

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Levantar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) (o el puerto que indique la terminal si 3000 está ocupado).

## Scripts

| Comando   | Descripción              |
|----------|---------------------------|
| `npm run dev`   | Servidor de desarrollo   |
| `npm run build` | Build de producción      |
| `npm run start` | Servidor de producción   |
| `npm run lint`  | Ejecutar ESLint          |
| `node --test lib/*.test.ts` | Tests de precios y de integridad del menú |

## Despliegue en Vercel

El proyecto está desplegado en **Vercel**: [candia-burger-menu.vercel.app](https://candia-burger-menu.vercel.app/).

1. Conecta este repositorio en [Vercel](https://vercel.com).
2. Vercel detectará Next.js y usará `npm run build` por defecto.
3. Variables de entorno (si las necesitas) configúralas en el dashboard de Vercel.

**Repositorio:** [github.com/lucascandia/candia-burger-menu](https://github.com/lucascandia/candia-burger-menu)

## Licencia

Proyecto privado.
