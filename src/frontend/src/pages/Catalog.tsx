import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/hooks/useQueries";
import { Gem } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend";

const CATEGORIES = [
  "All",
  "Anti Tarnish Jewellery",
  "Alloy Brass Jewellery",
  "Stainless Steel Jewellery",
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products, isLoading } = useGetProducts();

  const filtered: Product[] = (products ?? []).filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gold" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
            Our Collections
          </span>
          <div className="h-px w-12 bg-gold" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
          Shop All Jewellery
        </h1>
        <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
          Discover our full range of beautiful, affordable jewellery.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mb-10"
      >
        <TabsList className="flex flex-wrap gap-2 h-auto bg-muted p-2 rounded-lg w-full sm:w-auto mx-auto">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="font-body text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="catalog.filter.tab"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat} value={cat}>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {filtered.map((p, i) => (
                  <ProductCard key={String(p.id)} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-24 text-muted-foreground"
                data-ocid="catalog.empty_state"
              >
                <Gem size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-body text-lg font-medium">
                  No products yet.
                </p>
                <p className="font-body text-sm mt-1">Check back soon!</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
