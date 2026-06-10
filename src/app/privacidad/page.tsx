import { PageHero, SiteFooter } from "@/components/site";

export default function PrivacidadPage() {
  return (
    <main>
      <PageHero
        eyebrow="Privacidad"
        title="Datos pensados para una experiencia sincronizada."
        text="Biblion usa autenticación, perfil y sincronización para conservar preferencias, estudios y recursos del usuario."
      />
      <section className="section privacy-section">
        <div className="section-heading left">
          <span>Uso de datos</span>
          <h2>La app necesita datos para guardar y recuperar tu estudio.</h2>
          <p>
            El perfil, las preferencias, los estudios, las citas y la foto de
            perfil se manejan mediante Firebase Auth, Firestore y Firebase
            Storage. Los secretos de proveedores IA no viven en la app ni en el
            repositorio.
          </p>
        </div>
        <div className="deep-panel">
          <div>
            <span>Principio</span>
            <h3>Guardar solo lo que ayuda a leer, estudiar y sincronizar.</h3>
          </div>
          <p>
            Esta página funciona como base informativa para el sitio. Cuando
            Biblion este listo para distribuirse publicamente, conviene convertir
            este contenido en una politica legal revisada.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
