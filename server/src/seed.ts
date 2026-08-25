import mongoose from 'mongoose'
import { MenuItem } from './models/MenuItem'
import { Order } from './models/Order'
import { Reservation } from './models/Reservation'
import { Event } from './models/Event'
import { Coupon } from './models/Coupon'

// Import mock data directly using relative paths structure
// The frontend types don't exactly match Mongoose schema definitions (e.g. string IDs vs ObjectIds)
// We will format the data appropriately for Mongoose.

const restaurantMenu = [
  { name: 'Heritage Wagyu A5', description: 'Pan-seared A5 Wagyu, shaved Périgord truffles, roasted bone marrow jus, and smoked cauliflower silk.', price: 185, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600', type: 'restaurant', origin: 'Miyazaki Prefecture, Japan', available: true },
  { name: 'Blue Lobster Thermidor', description: 'Butter-poached lobster tail, saffron-infused Chardonnay reduction, wild samphire, and beluga caviar.', price: 145, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600', type: 'restaurant', origin: 'Brittany Coastline', available: true },
  { name: 'Black Truffle Scallops', description: 'Jumbo Hokkaido scallops, fresh black winter truffle, Jerusalem artichoke purée, and brown butter emulsion.', price: 95, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?w=600', type: 'restaurant', origin: 'Hokkaido, Japan', available: true },
  { name: 'Wild Forest Agnolotti', description: 'Porcini and Morel filling, 36-month aged Parmigiano-Reggiano foam, toasted hazelnuts, and sage oil.', price: 78, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600', type: 'restaurant', origin: 'Hand-crafted Pasta', available: true },
  { name: 'White Alba Truffle Risotto', description: 'Carnaroli rice, white Alba truffle, aged Parmesan, and truffle butter.', price: 120, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', type: 'restaurant', origin: 'Piedmont, Italy', available: true },
  { name: 'Foie Gras Terrine', description: 'Silky foie gras, Sauternes jelly, toasted brioche, and fig compote.', price: 65, category: 'Starters', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600', type: 'restaurant', available: true },
  { name: 'Tuna Tartare', description: 'Bluefin tuna, avocado mousse, yuzu vinaigrette, and crispy shallots.', price: 55, category: 'Starters', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600', type: 'restaurant', available: true },
  { name: 'Burrata & Heirloom Tomato', description: 'Creamy burrata, heritage tomatoes, basil oil, and aged balsamic reduction.', price: 42, category: 'Starters', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600', type: 'restaurant', available: true },
  { name: 'Lobster Bisque', description: 'Creamy lobster bisque with cognac cream, chive oil, and lobster claw.', price: 38, category: 'Soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600', type: 'restaurant', available: true },
  { name: 'French Onion Gratinée', description: 'Caramelized onion soup, Gruyère crouton, and thyme oil.', price: 32, category: 'Soups', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600', type: 'restaurant', available: true },
  { name: 'Gold Leaf Sorbet', description: 'Champagne sorbet infused with saffron and 24k edible gold leaf.', price: 22, category: 'Desserts', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', type: 'restaurant', available: true },
  { name: 'Chocolate Fondant', description: 'Valrhona dark chocolate, salted caramel core, vanilla bean ice cream.', price: 28, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', type: 'restaurant', available: true },
  { name: 'Vintage Dom Pérignon', description: '2012 Vintage, perfectly chilled, served tableside.', price: 350, category: 'Drinks', image: 'https://images.unsplash.com/photo-1547595628-c61a32b4cf0d?w=600', type: 'restaurant', available: true },
  { name: 'Saffron Gold Mocktail', description: 'Saffron-infused sparkling water, elderflower, and gold leaf.', price: 18, category: 'Drinks', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600', type: 'restaurant', available: true },
]

const barMenu = [
  { name: 'Velvet Nightfall', description: 'Aged bourbon, blackberry reduction, activated charcoal, and smoke-infused aromatic bitters.', price: 28, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600', type: 'bar', tags: ['Smoky', 'Bold'], available: true },
  { name: 'The Royal Gilded', description: '24k edible gold flakes, premium gin, white truffle essence, and clarified lemon juice.', price: 34, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600', type: 'bar', tags: ['Earthy', 'Crisp'], available: true },
  { name: 'Midnight Old Fashioned', description: 'Rare batch rye, maple syrup aged in cognac barrels, and house-blended walnut bitters.', price: 26, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600', type: 'bar', tags: ['Spiced', 'Classic'], available: true },
  { name: 'The Smoked Oak', description: 'A blend of 18-year scotch, house-made maple reduction, and charred cedar smoke.', price: 32, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1527761668-6f0e8683c38c?w=600', type: 'bar', tags: ['Smoky', 'Rich'], available: true },
  { name: 'Highland Legacy 1974', description: 'Single malt with notes of honeyed peat, dried apricot, and antique oak. Only 12 bottles remain.', price: 150, category: 'Whiskey', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600', type: 'bar', available: true },
  { name: 'Japanese Harmony', description: 'Suntory blend of malt and grain whiskies, delicate floral and honey notes.', price: 45, category: 'Whiskey', image: 'https://images.unsplash.com/photo-1602081115068-1e4e2dbe89e0?w=600', type: 'bar', available: true },
  { name: 'Château Margaux 2015', description: 'First Growth Bordeaux, opulent dark fruit, silky tannins, extraordinary length.', price: 280, category: 'Wine', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600', type: 'bar', available: true },
  { name: 'Opus One 2018', description: 'Napa Valley icon. Cassis, dark chocolate, and violet aromatics.', price: 220, category: 'Wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600', type: 'bar', available: true },
  { name: 'Velvet Dream', description: 'Empress Gin zero-proof, lavender-infused honey, and essences of violet cloud.', price: 18, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600', type: 'bar', tags: ['Floral', 'Sweet'], available: true },
  { name: 'Midnight Muse', description: 'Cold-press espresso, vanilla bean, activated charcoal, lemon bourbon zero-proof.', price: 16, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600', type: 'bar', tags: ['Bold', 'Coffee'], available: true },
  { name: 'Belgian Trappist Reserve', description: 'Westvleteren XII, rich caramel and dark fruit. One of the world\'s rarest.', price: 35, category: 'Beer', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600', type: 'bar', available: true },
  { name: 'IPA Gold Standard', description: 'Triple dry-hopped, citrus-forward, with a golden clarity.', price: 14, category: 'Beer', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600', type: 'bar', available: true },
]

const barEvents = [
  { title: 'Cello in the Shadows', description: 'A solo performance by Julian Ross paired with Islay peated malts.', date: '2026-04-24', time: '11:30 PM', bannerImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', status: 'sold_out' },
  { title: 'The Bourbon Seance', description: 'Rare pre-prohibition whiskey tasting and historical storytelling.', date: '2026-05-02', time: '12:00 AM', bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', status: 'limited', seatsRemaining: 12 },
  { title: 'Jazz & Juniper', description: 'Experimental gin infusions and live quartet from the New York underground.', date: '2026-05-15', time: '11:00 PM', bannerImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800', status: 'upcoming' },
  { title: 'Live DJ Night', description: 'An electrifying night with exclusive DJ sets and premium bottle service.', date: '2026-06-01', time: '10:00 PM', bannerImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800', status: 'upcoming' },
  { title: 'Cocktail Festival', description: 'Exclusive cocktail tastings from world-renowned mixologists.', date: '2026-06-15', time: '8:00 PM', bannerImage: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800', status: 'upcoming', seatsRemaining: 30 },
]

const sampleReservations = [
  { customerName: 'Eleanor Shellstrop', phone: '+1 555-092-3341', email: 'eleanor@test.com', date: '2026-03-18', time: '19:00', guests: 4, status: 'pending', type: 'restaurant', specialRequests: 'Window seat preferred' },
  { customerName: 'Tahani Al-Jamil', phone: '+1 555-777-8888', email: 'tahani@test.com', date: '2026-03-20', time: '21:00', guests: 2, status: 'approved', type: 'bar', specialRequests: 'VIP section' },
  { customerName: 'Jason Mendoza', phone: '+1 555-333-4444', email: 'jason@test.com', date: '2026-03-22', time: '20:00', guests: 6, status: 'pending', type: 'restaurant' },
]

const sampleCoupons = [
  { code: 'ROYAL20', discountPercentage: 20, expiryDate: '2026-06-30', usageLimit: 100, usedCount: 34, active: true },
  { code: 'WELCOME10', discountPercentage: 10, expiryDate: '2026-12-31', usageLimit: 500, usedCount: 128, active: true },
  { code: 'VIP50', discountPercentage: 50, expiryDate: '2026-04-15', usageLimit: 10, usedCount: 10, active: false },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/royal-wow')
    console.log('Connected to MongoDB. Clearing previous data...')

    await MenuItem.deleteMany({})
    await Order.deleteMany({})
    await Reservation.deleteMany({})
    await Event.deleteMany({})
    await Coupon.deleteMany({})

    console.log('Seeding menus...')
    const menus = await MenuItem.insertMany([...restaurantMenu, ...barMenu])

    console.log('Seeding events...')
    await Event.insertMany(barEvents)

    console.log('Seeding reservations...')
    await Reservation.insertMany(sampleReservations)

    console.log('Seeding coupons...')
    await Coupon.insertMany(sampleCoupons)

    console.log('Seeding orders...')
    const order1 = new Order({
      orderId: '#RW-9241',
      customerName: 'Eleanor Shellstrop',
      phone: '+1 (555) 092-3341',
      address: '123 Ethics Lane, Academic District',
      city: 'Phoenix',
      items: [{
        _id: menus[0]._id,
        name: menus[0].name,
        quantity: 2,
        price: menus[0].price
      }],
      subtotal: menus[0].price * 2,
      discount: 0,
      total: menus[0].price * 2,
      paymentMethod: 'card',
      status: 'pending',
      channel: 'restaurant'
    })
    await order1.save()

    const order2 = new Order({
      orderId: '#RW-9240',
      customerName: 'Chidi Anagonye',
      phone: '+1 (555) 092-3341',
      address: '123 Ethics Lane',
      city: 'Phoenix',
      items: [
        { _id: menus.find(m => m.name === 'Midnight Old Fashioned')!._id, name: 'Midnight Old Fashioned', quantity: 3, price: 26 },
      ],
      subtotal: 78,
      discount: 0,
      total: 78,
      paymentMethod: 'upi',
      status: 'preparing',
      channel: 'bar'
    })
    await order2.save()

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
