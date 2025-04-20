
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KPI } from "@/contexts/SchemesContext";
import { Label } from "@/components/ui/label";

interface EditKPIModalProps {
  open: boolean;
  onClose: () => void;
  kpi: KPI | null;
  onSave: (updatedKPI: Partial<KPI>) => void;
}

const EditKPIModal = ({ open, onClose, kpi, onSave }: EditKPIModalProps) => {
  const [formData, setFormData] = useState<Partial<KPI>>({});

  // Reset form data when KPI changes
  useEffect(() => {
    if (kpi) {
      setFormData(kpi);
    }
  }, [kpi]);

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('dataPoints.')) {
      const dataPointField = field.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        dataPoints: {
          ...(prev.dataPoints || {}),
          [dataPointField]: value
        }
      }) as Partial<KPI>);
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!kpi) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit KPI: {kpi.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">KPI Name</Label>
            <Input
              id="name"
              value={formData.name || kpi.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || kpi.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value</Label>
              <Input
                id="currentValue"
                type="number"
                value={formData.dataPoints?.currentValue || kpi.dataPoints.currentValue}
                onChange={(e) => handleChange("dataPoints.currentValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetValue">Target Value</Label>
              <Input
                id="targetValue"
                type="number"
                value={formData.dataPoints?.targetValue || kpi.dataPoints.targetValue}
                onChange={(e) => handleChange("dataPoints.targetValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.dataPoints?.unit || kpi.dataPoints.unit}
                onChange={(e) => handleChange("dataPoints.unit", e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trend">Trend</Label>
              <Select
                value={formData.trend || kpi.trend}
                onValueChange={(value) => handleChange("trend", value)}
              >
                <SelectTrigger id="trend">
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up">Up</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                  <SelectItem value="stable">Stable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minValue">Min Value</Label>
              <Input
                id="minValue"
                type="number"
                value={formData.minValue || kpi.minValue}
                onChange={(e) => handleChange("minValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxValue">Max Value</Label>
              <Input
                id="maxValue"
                type="number"
                value={formData.maxValue || kpi.maxValue}
                onChange={(e) => handleChange("maxValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
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

export default EditKPIModal;
