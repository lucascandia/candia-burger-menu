const DELIVERY_PHONE = "0983 009 309";
const DEV_WHATSAPP_HREF =
  "https://wa.me/595984522156?text=Hola,%20vi%20el%20men%C3%BA%20digital%20de%20Candia%20Burger%20y%20me%20gustar%C3%ADa%20consultar%20por%20un%20proyecto.";

export function Footer() {
  return (
    <footer className="py-12 text-center">
      <div className="text-zinc-400">
        <p className="text-sm">Delivery Disponible</p>
        <p className="mt-1 text-base font-medium">
          <a href={`tel:${DELIVERY_PHONE.replace(/\s/g, "")}`} className="text-zinc-400">
            {DELIVERY_PHONE}
          </a>
        </p>
      </div>
      <p className="mt-8 text-xs text-zinc-600">
        Desarrollado por{" "}
        <a
          href={DEV_WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 transition-colors duration-300 hover:text-orange-500"
        >
          Lucas Candia
        </a>
      </p>
    </footer>
  );
}
