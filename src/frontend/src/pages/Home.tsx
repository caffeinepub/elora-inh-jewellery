import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { useGetFeaturedProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gem } from "lucide-react";
import { motion } from "motion/react";

const MARQUEE_ITEMS = [
  { id: "m1", label: "Anti Tarnish Jewellery" },
  { id: "m2", label: "Alloy Brass Jewellery" },
  { id: "m3", label: "Stainless Steel Jewellery" },
  { id: "m4", label: "Anti Tarnish Jewellery" },
  { id: "m5", label: "Alloy Brass Jewellery" },
  { id: "m6", label: "Stainless Steel Jewellery" },
  { id: "m7", label: "Anti Tarnish Jewellery" },
  { id: "m8", label: "Alloy Brass Jewellery" },
];

const FEATURES = [
  {
    title: "Anti Tarnish",
    desc: "Jewellery that stays beautiful, wash after wash.",
  },
  {
    title: "Alloy Brass",
    desc: "Rich warm tones with lasting durability.",
  },
  {
    title: "Stainless Steel",
    desc: "Strength meets elegance \u2014 waterproof & everyday.",
  },
];

export default function Home() {
  const { data: featured, isLoading } = useGetFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-jewellery.dim_1400x700.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at 70% 40%, oklch(72 0.12 75) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="h-px w-8 bg-gold" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                Jewellery Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight mb-6 hero-text-shadow"
            >
              ELORA
              <span className="block text-gold italic">.INH</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-xl text-foreground/80 mb-10 leading-relaxed"
            >
              Affordable Luxury. Timeless Jewellery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/catalog">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-medium tracking-wide px-8 flex items-center gap-2 group"
                  data-ocid="hero.primary_button"
                >
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground font-body font-medium tracking-wide px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="font-body text-xs tracking-widest text-foreground/40 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-px h-8 bg-foreground/20"
          />
        </motion.div>
      </section>

      {/* Categories Strip */}
      <section className="bg-foreground text-primary-foreground py-4 overflow-hidden">
        <div className="flex items-center gap-12 whitespace-nowrap px-8">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item.id}
              className="flex items-center gap-3 font-body text-sm tracking-widest uppercase"
            >
              <Gem size={12} className="text-gold" />
              {item.label}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
              Curated for You
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
            Featured Collection
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-md mx-auto">
            Handpicked pieces that define effortless elegance.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : featured && featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={String(p.id)} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="featured.empty_state"
          >
            <Gem size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-body text-lg">New arrivals coming soon.</p>
            <p className="font-body text-sm mt-1">Check back shortly!</p>
          </div>
        )}

        {featured && featured.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body tracking-wide px-10"
              >
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* About Band */}
      <section className="bg-muted py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Why Choose ELORA.INH?
            </h2>
            <p className="font-body text-foreground/70 leading-relaxed text-lg">
              We believe every woman deserves beautiful jewellery that doesn't
              break the bank. Our collections are crafted from premium anti
              tarnish, alloy brass, and stainless steel \u2014 built to shine as
              bright as you do, every single day.
            </p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {FEATURES.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-left"
                >
                  <div className="w-8 h-0.5 bg-gold mb-3" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
