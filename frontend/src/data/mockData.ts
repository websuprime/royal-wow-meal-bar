import type { MenuItem, BarEvent, DashboardStats } from '@/types'

export const restaurantMenu: MenuItem[] = [
  // Starters
  { _id: 'r1', name: 'Heritage Wagyu A5', description: 'Pan-seared A5 Wagyu, shaved Périgord truffles, roasted bone marrow jus, and smoked cauliflower silk.', price: 185, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600', type: 'restaurant', origin: 'Miyazaki Prefecture, Japan', available: true },
  { _id: 'r2', name: 'Blue Lobster Thermidor', description: 'Butter-poached lobster tail, saffron-infused Chardonnay reduction, wild samphire, and beluga caviar.', price: 145, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600', type: 'restaurant', origin: 'Brittany Coastline', available: true },
  { _id: 'r3', name: 'Black Truffle Scallops', description: 'Jumbo Hokkaido scallops, fresh black winter truffle, Jerusalem artichoke purée, and brown butter emulsion.', price: 95, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?w=600', type: 'restaurant', origin: 'Hokkaido, Japan', available: true },
  { _id: 'r4', name: 'Wild Forest Agnolotti', description: 'Porcini and Morel filling, 36-month aged Parmigiano-Reggiano foam, toasted hazelnuts, and sage oil.', price: 78, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600', type: 'restaurant', origin: 'Hand-crafted Pasta', available: true },
  { _id: 'r5', name: 'White Alba Truffle Risotto', description: 'Carnaroli rice, white Alba truffle, aged Parmesan, and truffle butter.', price: 120, category: 'Main Courses', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', type: 'restaurant', origin: 'Piedmont, Italy', available: true },
  // Starters
  { _id: 'r6', name: 'Foie Gras Terrine', description: 'Silky foie gras, Sauternes jelly, toasted brioche, and fig compote.', price: 65, category: 'Starters', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600', type: 'restaurant', available: true },
  { _id: 'r7', name: 'Tuna Tartare', description: 'Bluefin tuna, avocado mousse, yuzu vinaigrette, and crispy shallots.', price: 55, category: 'Starters', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600', type: 'restaurant', available: true },
  { _id: 'r8', name: 'Burrata & Heirloom Tomato', description: 'Creamy burrata, heritage tomatoes, basil oil, and aged balsamic reduction.', price: 42, category: 'Starters', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600', type: 'restaurant', available: true },
  // Soups
  { _id: 'r9', name: 'Lobster Bisque', description: 'Creamy lobster bisque with cognac cream, chive oil, and lobster claw.', price: 38, category: 'Soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600', type: 'restaurant', available: true },
  { _id: 'r10', name: 'French Onion Gratinée', description: 'Caramelized onion soup, Gruyère crouton, and thyme oil.', price: 32, category: 'Soups', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600', type: 'restaurant', available: true },
  // Desserts
  { _id: 'r11', name: 'Gold Leaf Sorbet', description: 'Champagne sorbet infused with saffron and 24k edible gold leaf.', price: 22, category: 'Desserts', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', type: 'restaurant', available: true },
  { _id: 'r12', name: 'Chocolate Fondant', description: 'Valrhona dark chocolate, salted caramel core, vanilla bean ice cream.', price: 28, category: 'Desserts', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', type: 'restaurant', available: true },
  // Drinks
  { _id: 'r13', name: 'Vintage Dom Pérignon', description: '2012 Vintage, perfectly chilled, served tableside.', price: 350, category: 'Drinks', image: 'https://images.unsplash.com/photo-1547595628-c61a32b4cf0d?w=600', type: 'restaurant', available: true },
  { _id: 'r14', name: 'Saffron Gold Mocktail', description: 'Saffron-infused sparkling water, elderflower, and gold leaf.', price: 18, category: 'Drinks', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600', type: 'restaurant', available: true },
]

export const barMenu: MenuItem[] = [
  // Signature Cocktails
  { _id: 'b1', name: 'Velvet Nightfall', description: 'Aged bourbon, blackberry reduction, activated charcoal, and smoke-infused aromatic bitters.', price: 28, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600', type: 'bar', tags: ['Smoky', 'Bold'], available: true },
  { _id: 'b2', name: 'The Royal Gilded', description: '24k edible gold flakes, premium gin, white truffle essence, and clarified lemon juice.', price: 34, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600', type: 'bar', tags: ['Earthy', 'Crisp'], available: true },
  { _id: 'b3', name: 'Midnight Old Fashioned', description: 'Rare batch rye, maple syrup aged in cognac barrels, and house-blended walnut bitters.', price: 26, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600', type: 'bar', tags: ['Spiced', 'Classic'], available: true },
  { _id: 'b4', name: 'The Smoked Oak', description: 'A blend of 18-year scotch, house-made maple reduction, and charred cedar smoke.', price: 32, category: 'Signature Cocktails', image: 'https://images.unsplash.com/photo-1527761668-6f0e8683c38c?w=600', type: 'bar', tags: ['Smoky', 'Rich'], available: true },
  // Whiskey
  { _id: 'b5', name: 'Highland Legacy 1974', description: 'Single malt with notes of honeyed peat, dried apricot, and antique oak. Only 12 bottles remain.', price: 150, category: 'Whiskey', image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600', type: 'bar', available: true },
  { _id: 'b6', name: 'Japanese Harmony', description: 'Suntory blend of malt and grain whiskies, delicate floral and honey notes.', price: 45, category: 'Whiskey', image: 'https://images.unsplash.com/photo-1602081115068-1e4e2dbe89e0?w=600', type: 'bar', available: true },
  // Wine
  { _id: 'b7', name: 'Château Margaux 2015', description: 'First Growth Bordeaux, opulent dark fruit, silky tannins, extraordinary length.', price: 280, category: 'Wine', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600', type: 'bar', available: true },
  { _id: 'b8', name: 'Opus One 2018', description: 'Napa Valley icon. Cassis, dark chocolate, and violet aromatics.', price: 220, category: 'Wine', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600', type: 'bar', available: true },
  // Mocktails
  { _id: 'b9', name: 'Velvet Dream', description: 'Empress Gin zero-proof, lavender-infused honey, and essences of violet cloud.', price: 18, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600', type: 'bar', tags: ['Floral', 'Sweet'], available: true },
  { _id: 'b10', name: 'Midnight Muse', description: 'Cold-press espresso, vanilla bean, activated charcoal, lemon bourbon zero-proof.', price: 16, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600', type: 'bar', tags: ['Bold', 'Coffee'], available: true },
  // Beer
  { _id: 'b11', name: 'Belgian Trappist Reserve', description: 'Westvleteren XII, rich caramel and dark fruit. One of the world\'s rarest.', price: 35, category: 'Beer', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600', type: 'bar', available: true },
  { _id: 'b12', name: 'IPA Gold Standard', description: 'Triple dry-hopped, citrus-forward, with a golden clarity.', price: 14, category: 'Beer', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600', type: 'bar', available: true },
]

export const barEvents: BarEvent[] = [
  { _id: 'e1', title: 'Cello in the Shadows', description: 'A solo performance by Julian Ross paired with Islay peated malts.', date: '2026-04-24', time: '11:30 PM', bannerImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800', status: 'sold_out' },
  { _id: 'e2', title: 'The Bourbon Seance', description: 'Rare pre-prohibition whiskey tasting and historical storytelling.', date: '2026-05-02', time: '12:00 AM', bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800', status: 'limited', seatsRemaining: 12 },
  { _id: 'e3', title: 'Jazz & Juniper', description: 'Experimental gin infusions and live quartet from the New York underground.', date: '2026-05-15', time: '11:00 PM', bannerImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800', status: 'upcoming' },
  { _id: 'e4', title: 'Live DJ Night', description: 'An electrifying night with exclusive DJ sets and premium bottle service.', date: '2026-06-01', time: '10:00 PM', bannerImage: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800', status: 'upcoming' },
  { _id: 'e5', title: 'Cocktail Festival', description: 'Exclusive cocktail tastings from world-renowned mixologists.', date: '2026-06-15', time: '8:00 PM', bannerImage: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800', status: 'upcoming', seatsRemaining: 30 },
]

export const dashboardStats: DashboardStats = {
  totalRevenue: 128430,
  activeOrders: 42,
  upcomingBookings: 18,
  todayOrders: 67,
  pendingOrders: 12,
  preparingOrders: 8,
  deliveredOrders: 47,
  revenueChange: 12.5,
}

export const sampleOrders = [
  { _id: '1', orderId: '#RW-9241', customerName: 'Eleanor Shellstrop', phone: '+1 (555) 092-3341', address: '123 Ethics Lane, Academic District', city: 'Phoenix', items: [{ name: 'Ribeye Selection', quantity: 2, price: 71.25 }], total: 142.50, paymentMethod: 'card' as const, status: 'pending' as const, channel: 'restaurant' as const, createdAt: '2026-03-14T12:45:00Z' },
  { _id: '2', orderId: '#RW-9240', customerName: 'Chidi Anagonye', phone: '+1 (555) 092-3341', address: '123 Ethics Lane', city: 'Phoenix', items: [{ name: 'Old Fashioned (Smoked)', quantity: 3, price: 15 }, { name: 'Gourmet Nachos', quantity: 1, price: 18 }], total: 68.00, paymentMethod: 'upi' as const, status: 'preparing' as const, channel: 'bar' as const, createdAt: '2026-03-14T12:45:00Z' },
  { _id: '3', orderId: '#RW-9239', customerName: 'Tahani Al-Jamil', phone: '+1 (555) 777-8888', address: '742 Evergreen Terrace', city: 'New York', items: [{ name: 'Caviar Reserve', quantity: 1, price: 420 }], total: 420.00, paymentMethod: 'card' as const, status: 'delivered' as const, channel: 'restaurant' as const, createdAt: '2026-03-14T11:30:00Z' },
]

export const restaurantCategories = ['Starters', 'Soups', 'Main Courses', 'Desserts', 'Drinks']
export const barCategories = ['Signature Cocktails', 'Whiskey', 'Wine', 'Beer', 'Mocktails']

export const testimonials = [
  { name: 'Arthur Sterling III', text: '"Luxury is not just seen; it is felt in the weight of the silver, the clarity of the ice, and the silence of a perfect service."', role: 'Founding Patron' },
  { name: 'Isabella Romano', text: '"Every dish at Royal Wow tells a story of passion and precision. An experience that transcends mere dining."', role: 'Food Critic, Michelin Guide' },
  { name: 'James Wellington', text: '"The bar is an altar to mixology. Each cocktail is a masterpiece of flavor architecture."', role: 'Spirits Connoisseur' },
]

export const weeklyRevenue = [
  { day: 'MON', meals: 4200, bar: 3100 },
  { day: 'TUE', meals: 3800, bar: 2900 },
  { day: 'WED', meals: 5100, bar: 4200 },
  { day: 'THU', meals: 4800, bar: 3800 },
  { day: 'FRI', meals: 7200, bar: 6500 },
  { day: 'SAT', meals: 8500, bar: 7800 },
  { day: 'SUN', meals: 6200, bar: 4900 },
]
