import { Heart, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBentoCake from "@/assets/hero-bento-cake.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-romantic"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-blush/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gold-light/20 rounded-full blur-2xl animate-pulse-soft" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-secondary-foreground">
                Handcrafted with Love
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Baked with{" "}
              <span className="text-primary relative">
                Love
                <Heart className="absolute -top-2 -right-6 h-6 w-6 text-primary animate-pulse-soft" fill="currentColor" />
              </span>
              <br />
              for Your{" "}
              <span className="italic text-primary">Special Moments</span>
            </h1>

            <p className="font-sans text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8">
              Experience the artistry of handcrafted cakes and exclusive gift packages. 
              Every creation is made fresh with premium ingredients, just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/254705084125"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2 rounded-full px-8 shadow-elevated hover:shadow-glow transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  Order via WhatsApp
                </Button>
              </a>
              <a href="#menu">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-primary/30 hover:bg-primary/5"
                >
                  View Menu
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                Fresh Daily
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                Premium Quality
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose" />
                Made with Care
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative z-10">
              <img
                src={heroBentoCake}
                alt="Beautiful handcrafted bento cake with rose decorations"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-elevated"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-[90%] h-[90%] border-2 border-dashed border-primary/20 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
