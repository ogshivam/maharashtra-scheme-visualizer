import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Scheme } from "@/contexts/SchemesContext";
import { Label } from "@/components/ui/label";

interface EditSchemeModalProps {
  open: boolean;
  onClose: () => void;
  scheme: Scheme | null;
  onSave: (updatedScheme: Partial<Scheme>) => void;
}

const EditSchemeModal = ({ open, onClose, scheme, onSave }: EditSchemeModalProps) => {
  const [formData, setFormData] = useState<Partial<Scheme>>({});

  // Reset form data when scheme changes
  useState(() => {
    if (scheme) {
      setFormData({
        name: scheme.name,
        description: scheme.description
      });
    }
  });

  const handleChange = (field: keyof Scheme, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!scheme) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Scheme: {scheme.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Scheme Name</Label>
            <Input
              id="name"
              value={formData.name || scheme.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || scheme.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSchemeModal;
