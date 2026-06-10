import {
  PageHero,
  RepositoryIntegrationSection,
  SiteFooter,
  WaitlistCta,
  launchItems,
} from "@/components/site";

export default function DescargarPage() {
  return (
    <main>
      <PageHero
        eyebrow="Descargar"
        title="Biblion estará próximamente en Play Store."
        text="Únete a la lista de espera para solicitar acceso anticipado y ayudarnos a probar lectura, modo estudio y Bibi antes del lanzamiento público."
        showPlayStoreMark
      />
      <section className="section">
        <div className="section-heading">
          <span>Acceso anticipado</span>
          <h2>Antes de publicar Biblion, estamos cuidando lo esencial.</h2>
          <p>
            La prioridad es una experiencia estable para leer, guardar estudios,
            sincronizar datos y usar Bibi con reglas claras dentro del dominio
            bíblico.
          </p>
        </div>
        <div className="release-grid">
          {launchItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>
      <RepositoryIntegrationSection />
      <WaitlistCta />
      <SiteFooter />
    </main>
  );
}
