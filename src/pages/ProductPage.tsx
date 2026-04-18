import { products } from '../content'
import platformScene from '../assets/platform-scene.svg'
import dashboardScene from '../assets/dashboard-scene.svg'
import mindmapImg from '../assets/mindmap.png'

function ProductPage() {
  const productImages = [mindmapImg, platformScene, dashboardScene]

  return (
    <section className="section-shell section-block route-page product-page">
      <div className="product-head">
        <p className="eyebrow">My Tools</p>
        <h1>SaaS tools I develop for market</h1>
        <p className="page-copy">
          I design and ship SaaS tools that solve real engineering pain points.
          Each product is built with a strong focus on user experience, security
          by default, and long-term reliability.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <article key={product.name} className="product-card">
            <figure className="product-media">
              <img src={productImages[index % productImages.length]} alt={product.name} />
            </figure>
            <p className="product-status">{product.status}</p>
            <h2>{product.name}</h2>
            {/*<p className="product-tagline">{product.tagline}</p>*/}
            <p>{product.description}</p>
            <div className="product-footer">
              <p className="product-price">{product.price}</p>
              <a href={product.link} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                Try Now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductPage

