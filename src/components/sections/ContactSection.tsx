import { Phone, MessageCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Ready to <span className="text-primary italic">Order?</span>
            </h2>
            <p className="font-sans text-muted-foreground max-w-xl mx-auto">
              Contact us via WhatsApp or give us a call. We're here to make your
              special moments even sweeter.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <Card className="border-0 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground mb-4">
                  Send us a message anytime
                </p>
                <a
                  href="https://wa.me/254705084125"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full rounded-full bg-green-600 hover:bg-green-700">
                    Chat on WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Speak with us directly
                </p>
                <a href="tel:+254705084125">
                  <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    0705 084 125
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Urgency Notice */}
          <Card className="border-0 bg-primary/5 shadow-soft animate-fade-in">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 shrink-0">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                  Limited Slots Available
                </h4>
                <p className="text-muted-foreground">
                  Orders close once fully booked. We recommend placing your orders
                  early to secure your preferred date and time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hours */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Orders accepted daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
