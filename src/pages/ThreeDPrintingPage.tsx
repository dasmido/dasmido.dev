import businessCardScene from '../assets/business-card.svg'
import collaborationScene from '../assets/collaboration-scene.svg'
import deliveryScene from '../assets/delivery-scene.svg'
import platformScene from '../assets/platform-scene.svg'

type StoreItem = {
  name: string
  description: string
  material: string
  leadTime: string
  price: string
  image: string
}

const storeItems: StoreItem[] = [
  {
    name: 'Desk Cable Clip Set',
    description: 'Keep your workspace clean with a low-profile clip set for USB and power cables.',
    material: 'PLA / PETG',
    leadTime: '2-3 days',
    price: 'from $12',
    image: collaborationScene,
  },
  {
    name: 'Custom Nameplate',
    description: 'Personalized desk or door nameplate with your preferred text and style.',
    material: 'PLA',
    leadTime: '2 days',
    price: 'from $15',
    image: businessCardScene,
  },
  {
    name: 'Headphone Stand',
    description: 'Minimal and sturdy stand designed for daily use on office or home desks.',
    material: 'PETG',
    leadTime: '3-4 days',
    price: 'from $24',
    image: platformScene,
  },
  {
    name: 'Prototype Print (Small Part)',
    description: 'Fast prototype printing for small functional parts before final manufacturing.',
    material: 'PLA / PETG',
    leadTime: '1-2 days',
    price: 'from $18',
    image: deliveryScene,
  },
]

function ThreeDPrintingPage() {
  return (
    <section className="section-shell section-block route-page product-page">
      <div className="product-head">
        <p className="eyebrow">3D Store</p>
        <h1>3D Printing Store</h1>
        <p className="page-copy">
          A small side business for practical 3D printed products and quick custom orders. Pick an
          item, request purchase, and I will confirm final details and delivery.
        </p>
      </div>

      <div className="product-grid">
        {storeItems.map((item) => (
          <article key={item.name} className="product-card">
            <figure className="product-media">
              <img src={item.image} alt={item.name} />
            </figure>
            <p className="product-status">
              <span>{item.material}</span>
              <span>{item.leadTime}</span>
            </p>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="product-footer">
              <p className="product-price">{item.price}</p>
              <a
                className="btn btn-primary btn-sm"
                href={`mailto:jamalmohamad.ik@gmail.com?subject=${encodeURIComponent(`Purchase request - ${item.name}`)}`}
              >
                Request Purchase
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="split">
        <article>
          <h2>Ordering Process</h2>
          <p>
            Share item quantity, color preference, and delivery city. I will send confirmation,
            production timeline, and total price before printing.
          </p>
        </article>
        <article>
          <h2>Custom Requests</h2>
          <p>
            Need a unique part or custom design? I also accept one-off model requests for prototypes,
            office accessories, and replacement components.
          </p>
        </article>
      </section>
    </section>
  )
}

export default ThreeDPrintingPage
