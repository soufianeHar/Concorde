export default function Hero() {
  return (
    <section
      id="accueil"
      className="snap-section justify-center text-center px-6"
    >
      <h1
        className="
          animate-fade-in-up
          text-4xl md:text-6xl font-semibold leading-snug
          bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4]
          text-transparent bg-clip-text
          drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)]
        "
      >
        Gagnez votre temps , saisissez <br />
        votre besoin et trouvez le bon <br />
        profil !
      </h1>
    </section>
  );
}
