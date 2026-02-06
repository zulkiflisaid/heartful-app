import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import OtpVerification from "@/pages/auth/OtpVerification";
import ResetPassword from "@/pages/auth/ResetPassword";

// Main Pages
import HomePage from "@/pages/home/Home";
import SearchPage from "@/pages/home/Search";
import ProductDetail from "@/pages/home/ProductDetail";
import InboxPage from "@/pages/inbox/Inbox";
import ChatDetail from "@/pages/inbox/ChatDetail";
import TicketForm from "@/pages/inbox/TicketForm";
import CartPage from "@/pages/cart/Cart";
import CheckoutPage from "@/pages/cart/Checkout";
import OrdersPage from "@/pages/orders/Orders";
import OrderDetail from "@/pages/orders/OrderDetail";
import AccountPage from "@/pages/account/Account";
import EditProfile from "@/pages/account/EditProfile";
import ManageAddress from "@/pages/account/ManageAddress";
import Wishlist from "@/pages/account/Wishlist";
import NotificationSettings from "@/pages/account/NotificationSettings";
import ChangePassword from "@/pages/account/ChangePassword";
import Faq from "@/pages/account/Faq";
import About from "@/pages/account/About";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes (no bottom tab) */}
              <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/otp" element={<OtpVerification />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Main Routes (with bottom tab) */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/account" element={<AccountPage />} />
              </Route>

              {/* Detail/Sub Routes (no bottom tab) */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/inbox/chat/:id" element={<ChatDetail />} />
              <Route path="/inbox/ticket/new" element={<TicketForm />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders/:id" element={<OrderDetail />} />
              <Route path="/account/edit-profile" element={<EditProfile />} />
              <Route path="/account/addresses" element={<ManageAddress />} />
              <Route path="/account/wishlist" element={<Wishlist />} />
              <Route path="/account/notification-settings" element={<NotificationSettings />} />
              <Route path="/account/change-password" element={<ChangePassword />} />
              <Route path="/account/faq" element={<Faq />} />
              <Route path="/account/about" element={<About />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
