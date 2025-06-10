import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FontControlsProps {
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onFontWeightChange: (weight: string) => void;
}

const FontControls: React.FC<FontControlsProps> = ({
  fontSize,
  fontFamily,
  fontWeight,
  onFontSizeChange,
  onFontFamilyChange,
  onFontWeightChange,
}) => {
  const fontFamilies = [
    { value: "KaTeX_Main", label: "KaTeX Main (по умолчанию)" },
    { value: "Computer Modern", label: "Computer Modern" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Roboto", label: "Roboto" },
  ];

  const fontWeights = [
    { value: "normal", label: "Обычный" },
    { value: "bold", label: "Жирный" },
    { value: "lighter", label: "Тонкий" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Настройки шрифта</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Размер шрифта */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Размер шрифта: {fontSize}px
          </Label>
          <Slider
            value={[fontSize]}
            onValueChange={(value) => onFontSizeChange(value[0])}
            min={12}
            max={72}
            step={2}
            className="w-full"
          />
        </div>

        {/* Семейство шрифтов */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Шрифт</Label>
          <Select value={fontFamily} onValueChange={onFontFamilyChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Начертание */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Начертание</Label>
          <Select value={fontWeight} onValueChange={onFontWeightChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontWeights.map((weight) => (
                <SelectItem key={weight.value} value={weight.value}>
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FontControls;
