import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportPanelProps {
  latexContent: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  latexContent,
  fontSize,
  fontFamily,
  fontWeight,
}) => {
  const exportToSVG = async () => {
    const element = document.getElementById("formula-preview");
    if (!element || !latexContent.trim()) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const svg = `
        <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: ${fontSize}px; font-family: ${fontFamily}; font-weight: ${fontWeight};">
              ${element.innerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "formula.svg";
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка экспорта в SVG:", error);
    }
  };

  const exportToPDF = async () => {
    const element = document.getElementById("formula-preview");
    if (!element || !latexContent.trim()) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff",
        scale: 3,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("formula.pdf");
    } catch (error) {
      console.error("Ошибка экспорта в PDF:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexContent);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Экспорт</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={exportToSVG}
            disabled={!latexContent.trim()}
            className="w-full"
          >
            <Icon name="Download" size={16} />
            Экспорт в SVG
          </Button>

          <Button
            onClick={exportToPDF}
            disabled={!latexContent.trim()}
            variant="outline"
            className="w-full"
          >
            <Icon name="FileText" size={16} />
            Экспорт в PDF
          </Button>

          <Button
            onClick={copyToClipboard}
            disabled={!latexContent.trim()}
            variant="ghost"
            className="w-full"
          >
            <Icon name="Copy" size={16} />
            Копировать LaTeX
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
          <Icon name="Info" size={16} className="inline mr-2" />
          Файлы оптимизированы для открытия в Sketch на Mac
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportPanel;
