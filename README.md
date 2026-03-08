# Candia Burger - Menú digital

Menú digital de **Candia Burger** con carrito y pedido por WhatsApp. Desarrollado con Next.js 14, TypeScript y Tailwind CSS.

## Características

- Tema oscuro con acentos naranja/rojo (marca "Fuego")
- Logo y fotos de productos (hamburguesas, lomitos); emojis como fallback cuando no hay imagen
- Navegación por categorías con scroll suave y tab activo resaltado
- Carrito con Zustand y envío del pedido por WhatsApp
- Descripciones expandibles en productos con texto largo
- Footer con teléfono de delivery

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

## Despliegue en Vercel

1. Conecta este repositorio en [Vercel](https://vercel.com).
2. Vercel detectará Next.js y usará `npm run build` por defecto.
3. Variables de entorno (si las necesitas) configúralas en el dashboard de Vercel.

**Repositorio:** [github.com/lucascandia/candia-burger-menu](https://github.com/lucascandia/candia-burger-menu)

## Licencia

Proyecto privado.
