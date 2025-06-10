import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "katex/dist/katex.min.css";
import katex from "katex";

interface LatexEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
}

const LatexEditor: React.FC<LatexEditorProps> = ({
  value,
  onChange,
  fontSize,
  fontFamily,
  fontWeight,
}) => {
  const [error, setError] = useState<string>("");

  const renderFormula = () => {
    if (!value.trim()) {
      setError("");
      return (
        <div className="p-4 min-h-[200px] flex items-center justify-center bg-white rounded border">
          <span className="text-gray-400 text-sm">
            Введите LaTeX формулу слева...
          </span>
        </div>
      );
    }

    try {
      const html = katex.renderToString(value, {
        displayMode: true,
        throwOnError: true,
        strict: false,
      });

      setError("");
      return (
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
          }}
          className="p-4 min-h-[200px] flex items-center justify-center bg-white rounded border"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (err) {
      console.error("KaTeX render error:", err);
      setError("Ошибка в синтаксисе LaTeX");
      return (
        <div className="p-4 min-h-[200px] flex items-center justify-center bg-red-50 rounded border border-red-200">
          <div className="text-red-600 text-sm text-center">
            <div className="font-medium">Ошибка синтаксиса</div>
            <div className="mt-1">Проверьте правильность LaTeX кода</div>
          </div>
        </div>
      );
    }
  };

  const safeRenderFormula = () => {
    try {
      return renderFormula();
    } catch (err) {
      console.error("Formula render error:", err);
      return (
        <div className="p-4 min-h-[200px] flex items-center justify-center bg-yellow-50 rounded border border-yellow-200">
          <span className="text-yellow-600 text-sm">
            Ошибка рендеринга формулы
          </span>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Редактор */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Редактор LaTeX</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Введите LaTeX формулу, например: \int_{a}^{b} x^2 dx = \frac{b^3 - a^3}{3}"
            className="h-[300px] font-mono text-sm resize-none"
          />
          {error && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Превью */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Предварительный просмотр
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div id="formula-preview">{safeRenderFormula()}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatexEditor;
