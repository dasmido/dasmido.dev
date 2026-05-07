import { products } from '../content'

const productIconTones = [
  'product-tool-icon--violet',
  'product-tool-icon--amber',
  'product-tool-icon--teal',
  'product-tool-icon--rose',
] as const

function buildProductIconLabel(name: string) {
  const uppercaseLetters = name.match(/[A-Z0-9]/g)?.join('')

  if (uppercaseLetters && uppercaseLetters.length >= 2) {
    return uppercaseLetters.slice(0, 3)
  }

  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

function getProductIcon(name: string, index: number) {
  return {
    label: buildProductIconLabel(name),
    toneClassName: productIconTones[index % productIconTones.length],
  }
}

function ProductPage() {
  return (
    <section className="section-shell section-block route-page product-page">
      <div className="product-head">
        <p className="eyebrow">My Tools</p>
        <p className="page-copy">
          SaaS tools I developed to solve real engineering pain points.
        </p>
      </div>

      <div className="product-tools-grid">
        {products.map((product, index) => {
          const icon = getProductIcon(product.name, index)

          return (
            <article key={product.name} className="product-tool-card">
              <div className="product-tool-icon-shell">
                <div className={`product-tool-icon ${icon.toneClassName}`} aria-hidden="true">
                  {icon.label}
                </div>
              </div>
              <div className="product-tool-copy">
                <h2 className="product-tool-name">{product.name}</h2>
                <p className="product-tool-description">{product.tagline}</p>
              </div>
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="product-tool-link"
                aria-label={`Visit ${product.name} (opens in a new tab)`}
              >
                <svg
                  className="product-tool-link-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M11.5 4.5H15.5V8.5M15.5 4.5L9 11M8.5 6H6.5C5.39543 6 4.5 6.89543 4.5 8V13.5C4.5 14.6046 5.39543 15.5 6.5 15.5H12C13.1046 15.5 14 14.6046 14 13.5V11.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProductPage

