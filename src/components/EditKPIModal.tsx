
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  useState(() => {
    if (kpi) {
      setFormData(kpi);
    }
  });

  const handleChange = (field: keyof KPI, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentValue">Current Value</Label>
              <Input
                id="currentValue"
                type="number"
                step="any"
                value={formData.currentValue || kpi.currentValue}
                onChange={(e) => handleChange("currentValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetValue">Target Value</Label>
              <Input
                id="targetValue"
                type="number"
                step="any"
                value={formData.targetValue || kpi.targetValue}
                onChange={(e) => handleChange("targetValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit || kpi.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
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
              <Label htmlFor="minValue">Minimum Value</Label>
              <Input
                id="minValue"
                type="number"
                step="any"
                value={formData.minValue || kpi.minValue}
                onChange={(e) => handleChange("minValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxValue">Maximum Value</Label>
              <Input
                id="maxValue"
                type="number"
                step="any"
                value={formData.maxValue || kpi.maxValue}
                onChange={(e) => handleChange("maxValue", parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chartType">Chart Type</Label>
            <Select
              value={formData.chartType || kpi.chartType}
              onValueChange={(value: 'gauge' | 'bar' | 'line' | 'pie') => handleChange("chartType", value)}
            >
              <SelectTrigger id="chartType">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gauge">Gauge</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
              </SelectContent>
            </Select>
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
