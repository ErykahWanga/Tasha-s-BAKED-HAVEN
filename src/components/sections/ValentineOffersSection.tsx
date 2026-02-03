import { Heart, Gift, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import valentineSpecial from "@/assets/valentine-special.jpg";

interface Offer {
  id: string;
  name: string;
  contents: string;
  price: string;
  highlight?: boolean;
}

const offers: Offer[] = [
  {
    id: "1",
    name: "6 Cupcakes + Chocolate + Rose",
    contents: "6 creamed cupcakes, premium chocolates & a fresh rose",
    price: "KSh 1,300",
  },
  {
    id: "2",
    name: "Bento Cake + Chocolates",
    contents: "1 bento cake with assorted chocolates",
    price: "KSh 700",
  },
  {
    id: "3",
    name: "Bento + 2 Cupcakes + Chocolate",
    contents: "1 bento cake, 2 cupcakes & chocolates",
    price: "KSh 1,100",
    highlight: true,
  },
  {
    id: "4",
    name: "Bento + 5 Cupcakes + Chocolate",
    contents: "1 bento cake, 5 cupcakes & chocolates",
    price: "KSh 1,700",
  },
  {
    id: "5",
    name: "12 Cupcakes + Chocolates",
    contents: "12 creamed cupcakes & premium chocolates",
    price: "KSh 1,700",
  },
];

const ValentineOffersSection = () => {
  return (
    <section id="offers" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-valentine opacity-5" />
      
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${20 + (i % 3) * 10}px`,
              height: `${20 + (i % 3) * 10}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="text-sm font-medium text-primary">Limited Time</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Valentine's Day <span className="text-primary italic">Specials</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto">
            Make your loved ones feel special with our exclusive Valentine's packages.
            Handcrafted with extra love for the season of romance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Featured Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated group">
              <img
                src={valentineSpecial}
                alt="Valentine's Day special cupcakes and gift box"
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-8">
                <div className="text-primary-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Valentine's Exclusive
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                    Love is in the Details
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Decorative badge */}
            <div className="absolute -top-4 -right-4 bg-gold text-foreground px-4 py-2 rounded-full shadow-lg font-medium text-sm animate-pulse-soft">
              ❤️ Special Offer
            </div>
          </div>

          {/* Offers Grid */}
          <div className="space-y-4">
            {offers.map((offer, index) => (
              <Card
                key={offer.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-elevated animate-fade-in border-0 ${
                  offer.highlight
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card hover:bg-secondary/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        offer.highlight ? "bg-primary-foreground/20" : "bg-primary/10"
                      }`}
                    >
                      <Gift
                        className={`h-5 w-5 ${
                          offer.highlight ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </div>
                    <div>
                      <h4
                        className={`font-serif font-semibold text-lg ${
                          offer.highlight ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {offer.name}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          offer.highlight
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {offer.contents}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-serif text-xl font-bold whitespace-nowrap ${
                      offer.highlight ? "text-gold-light" : "text-primary"
                    }`}
                  >
                    {offer.price}
                  </div>
                </CardContent>
              </Card>
            ))}

            <a
              href="https://wa.me/254705084125?text=Hi!%20I'm%20interested%20in%20your%20Valentine's%20Day%20specials"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6"
            >
              <Button
                size="lg"
                className="w-full rounded-full gap-2 shadow-elevated hover:shadow-glow transition-all"
              >
                <Heart className="h-5 w-5" fill="currentColor" />
                Order Valentine's Special
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValentineOffersSection;
