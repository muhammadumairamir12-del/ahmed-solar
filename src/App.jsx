import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layout & Common Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AhmedAssistantLauncher from './components/assistant/AhmedAssistantLauncher';

// Core Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Projects from './pages/Projects';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import Warranty from './pages/Warranty';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Vlogs from './pages/Vlogs';

// Catalog & Product Pages
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Categories from './pages/Categories';

// Admin Panel Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManager from './pages/admin/ProductManager';
import CategoryManager from './pages/admin/CategoryManager';
import FirebaseSettings from './pages/admin/FirebaseSettings';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[var(--paper)] text-slate-800 font-[var(--font-body)] selection:bg-[var(--gold)] selection:text-[var(--navy-deep)]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/vlogs" element={<Vlogs />} />

              {/* Catalog & Dynamic Pages */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Admin Panel Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductManager />} />
              <Route path="/admin/categories" element={<CategoryManager />} />
              <Route path="/admin/firebase" element={<FirebaseSettings />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <AhmedAssistantLauncher />
        </div>
      </Router>
    </AppProvider>
  );
}
