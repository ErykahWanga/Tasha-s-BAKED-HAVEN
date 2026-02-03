import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, LogOut, Plus, Trash2, Save, Home } from "lucide-react";

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
}

interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  items: { name: string; contents: string; price: string }[];
  image_url: string;
  is_active: boolean;
  display_order: number;
}

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (roles?.role !== "admin") {
      await supabase.auth.signOut();
      navigate("/admin");
      return;
    }

    await loadData();
    setIsLoading(false);
  };

  const loadData = async () => {
    const [menuRes, offersRes] = await Promise.all([
      supabase.from("menu_items").select("*").order("display_order"),
      supabase.from("special_offers").select("*").order("display_order"),
    ]);

    if (menuRes.data) setMenuItems(menuRes.data as MenuItem[]);
    if (offersRes.data) {
      setOffers(offersRes.data.map((o: any) => ({
        ...o,
        items: Array.isArray(o.items) ? o.items : [],
      })) as SpecialOffer[]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const addMenuItem = async () => {
    const newItem = {
      category: "cake",
      name: "New Item",
      description: "",
      price: "KSh 0",
      image_url: "",
      is_active: true,
      display_order: menuItems.length,
    };

    const { data, error } = await supabase
      .from("menu_items")
      .insert(newItem)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add menu item");
      return;
    }

    setMenuItems([...menuItems, data as MenuItem]);
    toast.success("Menu item added");
  };

  const updateMenuItem = async (item: MenuItem) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("menu_items")
      .update({
        category: item.category,
        name: item.name,
        description: item.description,
        price: item.price,
        image_url: item.image_url,
        is_active: item.is_active,
        display_order: item.display_order,
      })
      .eq("id", item.id);

    if (error) {
      toast.error("Failed to update menu item");
    } else {
      toast.success("Menu item updated");
    }
    setIsSaving(false);
  };

  const deleteMenuItem = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete menu item");
      return;
    }

    setMenuItems(menuItems.filter((i) => i.id !== id));
    toast.success("Menu item deleted");
  };

  const addOffer = async () => {
    const newOffer = {
      title: "New Offer",
      subtitle: "",
      items: [],
      image_url: "",
      is_active: true,
      display_order: offers.length,
    };

    const { data, error } = await supabase
      .from("special_offers")
      .insert(newOffer)
      .select()
      .single();

    if (error) {
      toast.error("Failed to add offer");
      return;
    }

    setOffers([...offers, { ...data, items: [] } as SpecialOffer]);
    toast.success("Offer added");
  };

  const updateOffer = async (offer: SpecialOffer) => {
    setIsSaving(true);
    const { error } = await supabase
      .from("special_offers")
      .update({
        title: offer.title,
        subtitle: offer.subtitle,
        items: offer.items,
        image_url: offer.image_url,
        is_active: offer.is_active,
        display_order: offer.display_order,
      })
      .eq("id", offer.id);

    if (error) {
      toast.error("Failed to update offer");
    } else {
      toast.success("Offer updated");
    }
    setIsSaving(false);
  };

  const deleteOffer = async (id: string) => {
    const { error } = await supabase.from("special_offers").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete offer");
      return;
    }

    setOffers(offers.filter((o) => o.id !== id));
    toast.success("Offer deleted");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              View Site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="offers">Special Offers</TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl font-semibold">Menu Items</h2>
              <Button onClick={addMenuItem} className="gap-2 rounded-full">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) =>
                            setMenuItems(
                              menuItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, name: e.target.value }
                                  : i
                              )
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                          value={item.category}
                          onChange={(e) =>
                            setMenuItems(
                              menuItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, category: e.target.value }
                                  : i
                              )
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                          value={item.price}
                          onChange={(e) =>
                            setMenuItems(
                              menuItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, price: e.target.value }
                                  : i
                              )
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          value={item.image_url || ""}
                          onChange={(e) =>
                            setMenuItems(
                              menuItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, image_url: e.target.value }
                                  : i
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={item.description || ""}
                        onChange={(e) =>
                          setMenuItems(
                            menuItems.map((i) =>
                              i.id === item.id
                                ? { ...i, description: e.target.value }
                                : i
                            )
                          )
                        }
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.is_active}
                          onCheckedChange={(checked) =>
                            setMenuItems(
                              menuItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, is_active: checked }
                                  : i
                              )
                            )
                          }
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateMenuItem(item)}
                          disabled={isSaving}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMenuItem(item.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {menuItems.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No menu items yet. Click "Add Item" to create one.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Special Offers Tab */}
          <TabsContent value="offers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-2xl font-semibold">Special Offers</h2>
              <Button onClick={addOffer} className="gap-2 rounded-full">
                <Plus className="h-4 w-4" />
                Add Offer
              </Button>
            </div>

            <div className="grid gap-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={offer.title}
                          onChange={(e) =>
                            setOffers(
                              offers.map((o) =>
                                o.id === offer.id
                                  ? { ...o, title: e.target.value }
                                  : o
                              )
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input
                          value={offer.subtitle || ""}
                          onChange={(e) =>
                            setOffers(
                              offers.map((o) =>
                                o.id === offer.id
                                  ? { ...o, subtitle: e.target.value }
                                  : o
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={offer.image_url || ""}
                        onChange={(e) =>
                          setOffers(
                            offers.map((o) =>
                              o.id === offer.id
                                ? { ...o, image_url: e.target.value }
                                : o
                            )
                          )
                        }
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={offer.is_active}
                          onCheckedChange={(checked) =>
                            setOffers(
                              offers.map((o) =>
                                o.id === offer.id
                                  ? { ...o, is_active: checked }
                                  : o
                              )
                            )
                          }
                        />
                        <Label>Active</Label>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateOffer(offer)}
                          disabled={isSaving}
                          className="gap-2"
                        >
                          <Save className="h-4 w-4" />
                          Save
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteOffer(offer.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {offers.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No special offers yet. Click "Add Offer" to create one.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
