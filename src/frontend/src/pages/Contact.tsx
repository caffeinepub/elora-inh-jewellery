import { Button } from "@/components/ui/button";
import { Clock, Heart, Instagram, MapPin, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const INFO_ITEMS = [
  {
    icon: Clock,
    label: "Response Time",
    value: "Usually within a few hours",
  },
  { icon: MapPin, label: "Ships To", value: "All across India" },
  {
    icon: Heart,
    label: "Our Promise",
    value: "Quality jewellery at honest prices",
  },
];

export default function Contact() {
  return (
    <div>
      {/* Header */}
      <section className="py-20 text-center bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
              Get in Touch
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-foreground">
            Contact Us
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto text-lg">
            We'd love to hear from you. Reach out on WhatsApp or Instagram.
          </p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-8 shadow-warm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    WhatsApp
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Chat with us instantly
                  </p>
                </div>
              </div>
              <p className="font-body text-foreground/80 mb-5 leading-relaxed">
                Send us a message on WhatsApp to ask about products, place
                orders, or enquire about custom jewellery.
              </p>
              <p className="font-display text-2xl font-semibold text-foreground mb-5">
                +91 9496623220
              </p>
              <a
                href="https://wa.me/919496623220"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-medium flex items-center gap-2 w-full sm:w-auto"
                  data-ocid="contact.whatsapp.button"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-8 shadow-warm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Instagram size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Instagram
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Follow our journey
                  </p>
                </div>
              </div>
              <p className="font-body text-foreground/80 mb-5 leading-relaxed">
                Follow @elora.inh for new arrivals, styling inspiration, and
                exclusive deals. DM us for enquiries!
              </p>
              <p className="font-display text-2xl font-semibold text-foreground mb-5">
                @elora.inh
              </p>
              <a
                href="https://instagram.com/elora.inh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body font-medium flex items-center gap-2 w-full sm:w-auto"
                  data-ocid="contact.instagram.button"
                >
                  <Instagram size={18} />
                  Follow on Instagram
                </Button>
              </a>
            </motion.div>
          </div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground mb-4">
                About ELORA.INH
              </h2>
              <p className="font-body text-foreground/70 leading-relaxed mb-4">
                ELORA.INH was born from a simple belief — every woman deserves
                to feel beautiful without spending a fortune. We curate
                jewellery that is not just affordable but genuinely lasting.
              </p>
              <p className="font-body text-foreground/70 leading-relaxed">
                From delicate anti tarnish pieces for everyday wear, to bold
                alloy brass statement jewellery, and resilient stainless steel
                collections — our range is as diverse as the women who wear it.
              </p>
            </div>

            <div className="space-y-4">
              {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="font-body text-sm text-foreground font-medium">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
