import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddProduct,
  useCheckAdminPassword,
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "@/hooks/useQueries";
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type Product } from "../backend";

const CATEGORIES = [
  "Anti Tarnish Jewellery",
  "Alloy Brass Jewellery",
  "Stainless Steel Jewellery",
];

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  description: string;
  imageFile: File | null;
  imagePreview: string | null;
  existingImageBlob: ExternalBlob | null;
}

const emptyForm = (): ProductFormData => ({
  name: "",
  price: "",
  category: "",
  description: "",
  imageFile: null,
  imagePreview: null,
  existingImageBlob: null,
});

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("elora_admin") === "true",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm());
  const [uploadStep, setUploadStep] = useState<
    "idle" | "preparing" | "uploading" | "saving"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkPassword = useCheckAdminPassword();
  const { data: products, isLoading } = useGetProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleLogin = async () => {
    try {
      const ok = await checkPassword.mutateAsync(password);
      if (ok) {
        sessionStorage.setItem("elora_admin", "true");
        setIsAuthenticated(true);
        toast.success("Welcome back, Admin!");
      } else {
        toast.error("Incorrect password. Please try again.");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("elora_admin");
    setIsAuthenticated(false);
    setPassword("");
    toast.success("Logged out.");
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData(emptyForm());
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      imageFile: null,
      imagePreview: product.image.getDirectURL(),
      existingImageBlob: product.image,
    });
    setFormOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: ev.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    let imageBlob: ExternalBlob;

    if (formData.imageFile) {
      try {
        setUploadStep("preparing");
        const arrayBuf = await formData.imageFile.arrayBuffer();
        setUploadStep("uploading");
        imageBlob = ExternalBlob.fromBytes(new Uint8Array(arrayBuf));
      } catch {
        setUploadStep("idle");
        toast.error("Image upload failed. Please try again.");
        return;
      }
    } else if (formData.existingImageBlob) {
      imageBlob = formData.existingImageBlob;
    } else {
      toast.error("Please upload a product image.");
      return;
    }

    try {
      setUploadStep("saving");
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image: imageBlob,
        });
        toast.success("Product updated successfully!");
      } else {
        await addProduct.mutateAsync({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image: imageBlob,
        });
        toast.success("Product added successfully!");
      }
      setFormOpen(false);
      setFormData(emptyForm());
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setUploadStep("idle");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Product deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const isBusy = uploadStep !== "idle";

  const uploadStepLabel = () => {
    if (uploadStep === "preparing") return "Preparing image...";
    if (uploadStep === "uploading") return "Uploading image... please wait";
    if (uploadStep === "saving") return "Saving product...";
    return editingProduct ? "Save Changes" : "Add Product";
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl shadow-warm-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-semibold text-foreground">
              ELORA.INH
            </h1>
            <p className="font-body text-muted-foreground mt-2 text-sm">
              Admin Panel — Secure Access
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="admin-pass"
                className="font-body text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter admin password"
                  className="pr-10 font-body"
                  data-ocid="admin.password.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={checkPassword.isPending || !password}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body"
              data-ocid="admin.login.submit_button"
            >
              {checkPassword.isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />{" "}
                  Verifying...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
          <p className="font-body text-muted-foreground text-sm mt-1">
            Manage your ELORA.INH products
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={openAddForm}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-body flex items-center gap-2"
            data-ocid="admin.add_product.button"
          >
            <Plus size={16} /> Add Product
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="font-body text-sm"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Products List */}
      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.loading_state">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground"
          data-ocid="admin.empty_state"
        >
          <p className="font-body text-lg">
            No products yet. Add your first product!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product, idx) => (
            <motion.div
              key={String(product.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-xs"
              data-ocid="admin.product.row"
            >
              <img
                src={product.image.getDirectURL()}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-muted"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold text-foreground truncate">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {product.category}
                </p>
                <p className="font-body text-sm font-semibold text-foreground mt-0.5">
                  {product.price}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditForm(product)}
                  className="font-body text-xs flex items-center gap-1.5"
                  data-ocid={`admin.product.edit_button.${idx + 1}`}
                >
                  <Pencil size={13} /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeleteTarget(product)}
                  className="font-body text-xs flex items-center gap-1.5 text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
                  data-ocid={`admin.product.delete_button.${idx + 1}`}
                >
                  <Trash2 size={13} /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog
        open={formOpen}
        onOpenChange={(o) => {
          if (isBusy) return; // prevent closing while uploading
          setFormOpen(o);
          if (!o) setFormData(emptyForm());
        }}
      >
        <DialogContent
          className="sm:max-w-lg bg-card border-border"
          data-ocid="admin.form.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription className="font-body text-sm">
              {editingProduct
                ? "Update the product details below."
                : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>

          {/* Upload progress banner */}
          {isBusy && (
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-lg px-4 py-3">
              <Loader2
                size={18}
                className="animate-spin text-primary flex-shrink-0"
              />
              <div>
                <p className="font-body text-sm font-medium text-foreground">
                  {uploadStep === "preparing" && "Preparing your image..."}
                  {uploadStep === "uploading" && "Uploading image to server..."}
                  {uploadStep === "saving" && "Saving product..."}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Please wait, do not close this window.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4 py-2">
            <div>
              <Label className="font-body text-sm font-medium">
                Product Name *
              </Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Gold Leaf Necklace"
                className="mt-1.5 font-body"
                disabled={isBusy}
                data-ocid="admin.form.name.input"
              />
            </div>

            <div>
              <Label className="font-body text-sm font-medium">Price *</Label>
              <Input
                value={formData.price}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, price: e.target.value }))
                }
                placeholder="e.g. ₹299"
                className="mt-1.5 font-body"
                disabled={isBusy}
                data-ocid="admin.form.price.input"
              />
            </div>

            <div>
              <Label className="font-body text-sm font-medium">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, category: v }))
                }
                disabled={isBusy}
              >
                <SelectTrigger
                  className="mt-1.5 font-body"
                  data-ocid="admin.form.category.select"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="font-body">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="font-body text-sm font-medium">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Describe the product..."
                className="mt-1.5 font-body resize-none"
                rows={3}
                disabled={isBusy}
                data-ocid="admin.form.description.textarea"
              />
            </div>

            <div>
              <Label className="font-body text-sm font-medium">
                Product Image
              </Label>
              <div className="mt-1.5">
                {formData.imagePreview ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    {!isBusy && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            imageFile: null,
                            imagePreview: null,
                            existingImageBlob: null,
                          }))
                        }
                        className="absolute top-2 right-2 w-6 h-6 bg-foreground text-primary-foreground rounded-full flex items-center justify-center hover:bg-foreground/80"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isBusy}
                    className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    data-ocid="admin.form.image.upload_button"
                  >
                    <Upload size={24} />
                    <span className="font-body text-sm">
                      Click to upload image
                    </span>
                    <span className="font-body text-xs">
                      JPG, PNG, WEBP supported
                    </span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setFormOpen(false)}
              disabled={isBusy}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isBusy}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-body min-w-[140px]"
              data-ocid="admin.form.submit_button"
            >
              {isBusy ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {uploadStepLabel()}
                </>
              ) : editingProduct ? (
                "Save Changes"
              ) : (
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="bg-card border-border"
          data-ocid="admin.delete.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="font-body"
              data-ocid="admin.delete.cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteProduct.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-body"
              data-ocid="admin.delete.confirm_button"
            >
              {deleteProduct.isPending ? (
                <>
                  <Loader2 size={14} className="mr-1.5 animate-spin" />{" "}
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
