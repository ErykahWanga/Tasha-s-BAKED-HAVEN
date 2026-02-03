import { Cake, Gift, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import vanillaBento from "@/assets/vanilla-bento.jpg";
import chocolateBento from "@/assets/chocolate-bento.jpg";
import redvelvetBento from "@/assets/redvelvet-bento.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import comradeDeluxe from "@/assets/comrade-deluxe.jpg";
import baddiesPremium from "@/assets/baddies-premium.jpg";
import divasPackage from "@/assets/divas-package.jpg";
import waridiPackage from "@/assets/waridi-package.jpg";

const cakeFlavors = [
  { name: "Vanilla", image: vanillaBento, description: "Classic vanilla with smooth buttercream" },
  { name: "Chocolate", image: chocolateBento, description: "Rich dark chocolate indulgence" },
  { name: "Red Velvet", image: redvelvetBento, description: "Velvety red with cream cheese frosting" },
];

const cakeSizes = [
  { size: "800g Cake", price: "KSh 1,400", note: "Extra charges for toppings/custom designs" },
  { size: "1 Kg Cake", price: "Available", note: "Contact for pricing" },
  { size: "2 Kg Cake", price: "Available", note: "Contact for pricing" },
];

const giftPackages = [
  {
    name: "Comrade Deluxe Package",
    emoji: "🌸",
    price: "KSh 500",
    image: comradeDeluxe,
    items: ["Creamed Cupcakes (3 pcs)", "Facial Masks (2 sachets)", "Beaded Bracelets (2 pcs)"],
  },
  {
    name: "Baddies Premium Package",
    emoji: "💅",
    price: "KSh 1,000",
    image: baddiesPremium,
    items: ["Bento Cake (1 pc)", "Scrunchie (1 pc)", "Mini Wipes (2 packets)", "Hair Charms (2 pcs)"],
  },
  {
    name: "The Divas Package",
    emoji: "👑",
    price: "KSh 2,000",
    image: divasPackage,
    items: [
      "Bento Cake + Cupcakes (1 + 5 pcs)",
      "Hair Pin (1 pc)",
      "Usha's Lipgloss (1 pc)",
      "Coin Purse (1 pc)",
      "Scrunchie + Moana Clip",
    ],
  },
  {
    name: "Waridi Package",
    emoji: "🌹",
    price: "KSh 2,500",
    image: waridiPackage,
    items: ["1 Kg Cake", "Triplet Rose Bouquet", "Fancy Keyholder Charm"],
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-cream/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-4">
            <Star className="h-4 w-4 text-gold" fill="currentColor" />
            <span className="text-sm font-medium text-foreground">Our Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Delicious <span className="text-primary italic">Creations</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto">
            From elegant bento cakes to curated gift packages — discover our range
            of handcrafted delights.
          </p>
        </div>

        <Tabs defaultValue="cakes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 bg-secondary/50 p-1 rounded-full">
            <TabsTrigger
              value="cakes"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Cake className="h-4 w-4 mr-2" />
              Cakes & Sizes
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Gift className="h-4 w-4 mr-2" />
              Gift Packages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cakes" className="animate-fade-in">
            {/* Flavors */}
            <div className="mb-12">
              <h3 className="font-serif text-2xl font-semibold text-center mb-8">
                Available Flavors
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cakeFlavors.map((flavor, index) => (
                  <Card
                    key={flavor.name}
                    className="group overflow-hidden border-0 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={flavor.image}
                        alt={`${flavor.name} cake`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5 text-center">
                      <h4 className="font-serif text-xl font-semibold text-foreground mb-1">
                        {flavor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {flavor.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cupcakes */}
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="font-serif text-2xl font-semibold mb-4">
                    Creamed Cupcakes
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our signature cupcakes are baked fresh daily and topped with
                    silky smooth buttercream. Available in all our delicious flavors.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-xl">
                      <span className="font-medium">6 Cupcakes</span>
                      <span className="font-serif font-bold text-primary">Contact for price</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-xl">
                      <span className="font-medium">12 Cupcakes</span>
                      <span className="font-serif font-bold text-primary">Contact for price</span>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src={cupcakes}
                    alt="Beautiful pink frosted cupcakes"
                    className="w-full rounded-3xl shadow-elevated"
                  />
                </div>
              </div>
            </div>

            {/* Cake Sizes */}
            <div>
              <h3 className="font-serif text-2xl font-semibold text-center mb-8">
                Cake Sizes & Pricing
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {cakeSizes.map((cake, index) => (
                  <Card
                    key={cake.size}
                    className="text-center border-0 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Cake className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="font-serif text-lg font-semibold mb-2">
                        {cake.size}
                      </h4>
                      <p className="font-serif text-2xl font-bold text-primary mb-2">
                        {cake.price}
                      </p>
                      <p className="text-xs text-muted-foreground">{cake.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="animate-fade-in">
            <div className="grid sm:grid-cols-2 gap-6">
              {giftPackages.map((pkg, index) => (
                <Card
                  key={pkg.name}
                  className="group overflow-hidden border-0 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-gold text-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {pkg.price}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{pkg.emoji}</span>
                      <h4 className="font-serif text-xl font-semibold text-foreground">
                        {pkg.name}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {pkg.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MenuSection;
