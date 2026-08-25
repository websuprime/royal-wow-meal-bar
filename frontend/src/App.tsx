import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from '@/pages/LandingPage'
import RestaurantHome from '@/pages/restaurant/Home'
import RestaurantMenu from '@/pages/restaurant/Menu'
import RestaurantAbout from '@/pages/restaurant/About'
import RestaurantContact from '@/pages/restaurant/Contact'
import RestaurantCheckout from '@/pages/restaurant/Checkout'
import BarHome from '@/pages/bar/Home'
import BarMenu from '@/pages/bar/Menu'
import BarEvents from '@/pages/bar/Events'
import BarAbout from '@/pages/bar/About'
import BarContact from '@/pages/bar/Contact'
import BarBookTable from '@/pages/bar/BookTable'
import AdminLogin from '@/pages/admin/Login'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminOrders from '@/pages/admin/Orders'
import AdminMenuMgmt from '@/pages/admin/MenuManagement'
import AdminReservations from '@/pages/admin/Reservations'
import AdminEvents from '@/pages/admin/Events'
import AdminMessages from '@/pages/admin/Messages'
import AdminCoupons from '@/pages/admin/Coupons'
import AdminAnalytics from '@/pages/admin/Analytics'
import AdminCategories from '@/pages/admin/CategoryManagement'
import AdminLayout from '@/layouts/AdminLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Restaurant */}
            <Route path="/restaurant" element={<RestaurantHome />} />
            <Route path="/restaurant/menu" element={<RestaurantMenu />} />
            <Route path="/restaurant/about" element={<RestaurantAbout />} />
            <Route path="/restaurant/contact" element={<RestaurantContact />} />
            <Route path="/restaurant/checkout" element={<RestaurantCheckout />} />

            {/* Bar */}
            <Route path="/bar" element={<BarHome />} />
            <Route path="/bar/menu" element={<BarMenu />} />
            <Route path="/bar/events" element={<BarEvents />} />
            <Route path="/bar/about" element={<BarAbout />} />
            <Route path="/bar/contact" element={<BarContact />} />
            <Route path="/bar/book-table" element={<BarBookTable />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
            <Route path="/admin/menu" element={<AdminLayout><AdminMenuMgmt /></AdminLayout>} />
            <Route path="/admin/reservations" element={<AdminLayout><AdminReservations /></AdminLayout>} />
            <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
            <Route path="/admin/coupons" element={<AdminLayout><AdminCoupons /></AdminLayout>} />
            <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
            <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
