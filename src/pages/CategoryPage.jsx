import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBrandParam = searchParams.get('brand');

  const { products, categories, brands } = useApp();
  const [selectedBrand, setSelectedBrand] = useState(activeBrandParam || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedBrand(activeBrandParam || 'ALL');
  }, [activeBrandParam, categoryId]);

  const currentCategory = categories.find((c) => c.id === categoryId) || {
    id: categoryId,
    name: categoryId?.replace(/-/g, ' '),
    description: 'Browse solar equipment and pricing',
  };

  const categoryBrands = brands[categoryId] || [];

  const categoryProducts = products.filter((p) => {
    const matchesCat = p.category === categoryId;
    const matchesBrand =
      selectedBrand === 'ALL' || p.brand?.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesBrand && matchesSearch;
  });

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    if (brand === 'ALL') {
      searchParams.delete('brand');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ brand });
    }
  };

  return (
    <div className="pb-16">
      <section className="bg-[var(--navy)] text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Category
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold capitalize">
            {currentCategory.name}
          </h1>
          <p className="text-white/70 text-sm max-w-xl">{currentCategory.description}</p>
          <Link to="/shop" className="inline-block text-xs font-bold text-[var(--gold)] hover:underline pt-1">
            ← All shop products
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4">
        <div className="bg-white border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder={`Search in ${currentCategory.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
            />
          </div>
          <p className="text-xs font-bold text-slate-500 self-center shrink-0">
            {categoryProducts.length} products
          </p>
        </div>

        {categoryBrands.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Brand
            </span>
            <button
              type="button"
              onClick={() => handleBrandSelect('ALL')}
              className={`px-3 py-1.5 text-[11px] font-bold shrink-0 ${
                selectedBrand === 'ALL'
                  ? 'bg-[var(--navy)] text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              All
            </button>
            {categoryBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandSelect(brand)}
                className={`px-3 py-1.5 text-[11px] font-bold shrink-0 ${
                  selectedBrand.toLowerCase() === brand.toLowerCase()
                    ? 'bg-[var(--navy)] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}

        {categoryProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">No products in this filter.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
