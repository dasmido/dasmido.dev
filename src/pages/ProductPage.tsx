import { products } from '../content'
import platformScene from '../assets/platform-scene.svg'
import dashboardScene from '../assets/dashboard-scene.svg'
import collaborationScene from '../assets/collaboration-scene.svg'

function ProductPage() {
  const productImages = [platformScene, dashboardScene, collaborationScene]

  return (
    <section className="section-shell section-block route-page product-page">
      <div className="product-head">
        <p className="eyebrow">Product</p>
        <h1>SaaS tools I build for modern teams.</h1>
        <p className="page-copy">
          Productized solutions focused on speed, reliability, and security for
          engineering-led businesses.
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
            <p className="product-tagline">{product.tagline}</p>
            <p>{product.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductPage

