
import { useMemo, useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import './ProductDetail.css';

type RelatedProduct = {
  id: string;
  name: string;
  price: string;
};

const ProductDetail = () => {
  const thumbnails = useMemo(() => ['t1', 't2', 't3', 't4'], []);
  const related = useMemo<RelatedProduct[]>(
    () => [
      { id: 'rp1', name: 'Aretes Petite Hongo', price: '$ 25.000' },
      { id: 'rp2', name: 'Pulsera Dual Red', price: '$ 35.000' },
      { id: 'rp3', name: 'Collar Bosque Encantado', price: '$ 65.000' },
      { id: 'rp4', name: 'Anillo Carmesí', price: '$ 18.000' },
    ],
    [],
  );

  const [activeThumb, setActiveThumb] = useState(thumbnails[0]);
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState<'materials' | 'care' | null>('materials');

  const decQty = () => setQty((q) => Math.max(1, q - 1));
  const incQty = () => setQty((q) => Math.min(99, q + 1));

  return (
    <div className="pd-page">
      <div className="pd-container">
        <div className="pd-breadcrumb">INICIO / JOYERÍA / DUAL HONGO</div>

        <section className="pd-hero">
          <div className="pd-gallery">
            <div className="pd-main-image">
              <button className="pd-fav" type="button" aria-label="Agregar a favoritos">
                <Heart size={18} />
              </button>
              <div className="pd-main-placeholder" aria-hidden="true" />
            </div>

            <div className="pd-thumbs" role="tablist" aria-label="Miniaturas del producto">
              {thumbnails.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`pd-thumb ${activeThumb === t ? 'active' : ''}`}
                  onClick={() => setActiveThumb(t)}
                  aria-label={`Ver imagen ${t}`}
                  aria-pressed={activeThumb === t}
                >
                  <div className="pd-thumb-placeholder" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <aside className="pd-info">
            <div className="pd-collection">COLECCIÓN ARTESANAL</div>
            <h1 className="pd-title">Dual Hongo</h1>
            <div className="pd-price">$ 50.000 COP</div>
            <p className="pd-desc">
              Un collar artesanal o doble vuelta, diseñado con cuentas de cristal premium en tonos rubí y un dije
              cerámico de hongo detallado a mano. Una pieza lúdica pero sofisticada que celebra la naturaleza y la
              artesanía tradicional.
            </p>

            <div className="pd-qty">
              <div className="pd-qty-label">CANTIDAD</div>
              <div className="pd-stepper" aria-label="Selector de cantidad">
                <button type="button" className="pd-stepper-btn" onClick={decQty} aria-label="Disminuir cantidad">
                  –
                </button>
                <div className="pd-stepper-value" aria-live="polite">
                  {qty}
                </div>
                <button type="button" className="pd-stepper-btn" onClick={incQty} aria-label="Aumentar cantidad">
                  +
                </button>
              </div>
            </div>

            <div className="pd-actions">
              <button type="button" className="pd-btn primary">
                AGREGAR AL CARRITO
              </button>
              <button type="button" className="pd-btn ghost">
                COMPRAR AHORA
              </button>
            </div>

            <div className="pd-accordions">
              <div className={`pd-accordion ${openPanel === 'materials' ? 'open' : ''}`}>
                <button
                  type="button"
                  className="pd-accordion-trigger"
                  onClick={() => setOpenPanel((p) => (p === 'materials' ? null : 'materials'))}
                  aria-expanded={openPanel === 'materials'}
                >
                  <span>MATERIALES & ORIGEN</span>
                  <ChevronDown size={16} />
                </button>
                <div className="pd-accordion-panel">
                  <ul className="pd-list">
                    <li>Cuentas de cristal facetado rojo rubí.</li>
                    <li>Dije de cerámica esmaltada artesanal.</li>
                    <li>Broche y componentes bañados en oro de 18k.</li>
                    <li>Hecho a mano en Colombia.</li>
                  </ul>
                </div>
              </div>

              <div className={`pd-accordion ${openPanel === 'care' ? 'open' : ''}`}>
                <button
                  type="button"
                  className="pd-accordion-trigger"
                  onClick={() => setOpenPanel((p) => (p === 'care' ? null : 'care'))}
                  aria-expanded={openPanel === 'care'}
                >
                  <span>CUIDADOS</span>
                  <ChevronDown size={16} />
                </button>
                <div className="pd-accordion-panel">
                  <ul className="pd-list">
                    <li>Evita contacto con agua, perfumes y cremas.</li>
                    <li>Guarda la pieza en un lugar seco, preferiblemente en su estuche.</li>
                    <li>Limpia con paño suave y seco.</li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="pd-related">
          <div className="pd-related-head">
            <div>
              <h2 className="pd-related-title">Productos Relacionados</h2>
              <div className="pd-related-sub">COMPLETA TU LOOK</div>
            </div>
            <a className="pd-related-link" href="#" onClick={(e) => e.preventDefault()}>
              ver todo
            </a>
          </div>

          <div className="pd-related-grid">
            {related.map((p) => (
              <article key={p.id} className="pd-card">
                <div className="pd-card-img" aria-hidden="true" />
                <div className="pd-card-name">{p.name}</div>
                <div className="pd-card-price">{p.price}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;

