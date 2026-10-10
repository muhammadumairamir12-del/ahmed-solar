import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  initialProducts,
  initialCategories,
  initialBrands,
  initialProjects,
  initialReviews,
  initialFaqs,
  companyDetails,
} from '../data/catalog';
import { applyCommerceExtras } from '../data/commerceExtras';
import { normalizeProducts, normalizeProduct } from '../utils/productNormalize';
import { getOfferPricing, parseNumericPrice } from '../utils/pricing';

const STORAGE = {
  products: 'atsolar_products_v3',
  categories: 'atsolar_categories_v3',
  brands: 'atsolar_brands_v3',
  reviews: 'atsolar_reviews_v2',
  admin: 'atsolar_admin_auth',
  firebase: 'atsolar_firebase_config',
  cart: 'atsolar_cart_v1',
};

const seededProducts = normalizeProducts(applyCommerceExtras(initialProducts));

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = loadJSON(STORAGE.products, null);
    if (!saved) return seededProducts;
    return normalizeProducts(
      saved.map((p) => {
        const seed = seededProducts.find((s) => s.id === p.id);
        return { ...(seed || {}), ...p };
      }),
    );
  });

  const [categories, setCategories] = useState(() =>
    loadJSON(STORAGE.categories, initialCategories),
  );
  const [brands, setBrands] = useState(() => loadJSON(STORAGE.brands, initialBrands));
  const [projects] = useState(initialProjects);
  const [reviews, setReviews] = useState(() => loadJSON(STORAGE.reviews, initialReviews));
  const [faqs] = useState(initialFaqs);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => localStorage.getItem(STORAGE.admin) === 'true',
  );
  const [firebaseConfig, setFirebaseConfig] = useState(() =>
    loadJSON(STORAGE.firebase, null),
  );

  const [cart, setCart] = useState(() => loadJSON(STORAGE.cart, []));

  useEffect(() => {
    localStorage.setItem(STORAGE.products, JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(STORAGE.categories, JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem(STORAGE.brands, JSON.stringify(brands));
  }, [brands]);
  useEffect(() => {
    localStorage.setItem(STORAGE.reviews, JSON.stringify(reviews));
  }, [reviews]);
  useEffect(() => {
    localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  }, [cart]);

  const loginAdmin = (username, password) => {
    if (
      (username === 'ahmed' || username === 'admin') &&
      (password === 'solar123' || password === 'admin123')
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE.admin, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE.admin);
  };

  const addProduct = (newProd) => {
    const prodWithId = normalizeProduct({
      ...newProd,
      id: newProd.id || `prod-${Date.now()}`,
      numericPrice: parseNumericPrice(newProd.price),
      offer:
        newProd.offerPercent || newProd.offerLabel
          ? {
              percent: Number(newProd.offerPercent) || 0,
              label: newProd.offerLabel || 'Offer',
            }
          : newProd.offer || null,
    });
    setProducts((prev) => [prodWithId, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const merged = { ...p, ...updatedFields };
        if (updatedFields.price != null) {
          merged.numericPrice = parseNumericPrice(updatedFields.price);
        }
        return normalizeProduct(merged);
      }),
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = (categoryObj) => {
    setCategories((prev) => [...prev, categoryObj]);
    if (!brands[categoryObj.id]) {
      setBrands((prev) => ({ ...prev, [categoryObj.id]: [] }));
    }
  };

  const addBrandToCategory = (catId, brandName) => {
    setBrands((prev) => {
      const current = prev[catId] || [];
      if (current.includes(brandName)) return prev;
      return { ...prev, [catId]: [...current, brandName] };
    });
  };

  const addReview = (reviewObj) => {
    const newRev = {
      ...reviewObj,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const saveFirebaseConfig = (config) => {
    setFirebaseConfig(config);
    localStorage.setItem(STORAGE.firebase, JSON.stringify(config));
  };

  /* ——— Cart ——— */
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min((i.qty || 1) + qty, 99) } : i,
        );
      }
      const pricing = getOfferPricing(product);
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: pricing.displayPrice,
          numericPrice: pricing.numeric,
          watts: product.watts,
          qty: Math.max(1, qty),
        },
      ];
    });
  };

  const updateCartQty = (id, qty) => {
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + (i.qty || 1), 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + (i.numericPrice || 0) * (i.qty || 1), 0),
    [cart],
  );

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        brands,
        projects,
        reviews,
        faqs,
        companyDetails,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        addBrandToCategory,
        addReview,
        firebaseConfig,
        saveFirebaseConfig,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
