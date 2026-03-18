import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const waUrl = `https://wa.me/919496623220?text=${encodeURIComponent(
    `Hi I want to order ${product.name} from ELORA.INH`,
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image.getDirectURL()}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-base font-medium text-foreground mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="font-body font-semibold text-foreground text-lg mb-4">
          {product.price}
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body text-sm flex items-center gap-2"
            data-ocid="product.whatsapp.button"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
