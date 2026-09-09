import Reveal from "./Reveal";

const EMAIL = "anderson_alessandri@hotmail.com";

export default function Hero() {
  return (
    <section id="home" className="section hero">
      <Reveal>
        <span className="eyebrow">Designer de Interface · Rio de Janeiro</span>

        <h1 className="hero-name">Anderson Alessandri</h1>

        <p className="hero-statement">
          Desenho interfaces <span className="em">e o processo</span> que leva
          até elas.
        </p>

        <p className="lede hero-lede">
          Há 12 anos na ponte entre design de produto e engenharia front-end.
          Trabalho a jornada inteira — da pesquisa à entrega — e mostro cada
          decisão pelo caminho.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            Ver o processo
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-link">
            {EMAIL}
          </a>
        </div>

        <dl className="hero-meta">
          <div>
            <dt>Atualmente</dt>
            <dd>Disponível para projetos e posições de Design Engineer</dd>
          </div>
          <div>
            <dt>Foco</dt>
            <dd>Pesquisa, design systems, front-end e automação com IA</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
