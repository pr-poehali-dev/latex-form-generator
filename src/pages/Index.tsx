import React, { useState } from "react";
import LatexEditor from "@/components/LatexEditor";
import FontControls from "@/components/FontControls";
import ExportPanel from "@/components/ExportPanel";
import FormulaLibrary from "@/components/FormulaLibrary";

const Index = () => {
  const [latexContent, setLatexContent] = useState(
    "\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}",
  );
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("KaTeX_Main");
  const [fontWeight, setFontWeight] = useState("normal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Генератор LaTeX формул
          </h1>
          <p className="text-xl text-gray-600">
            Создавайте математические формулы с поддержкой русского языка
          </p>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Редактор - занимает 2 колонки */}
          <div className="xl:col-span-2">
            <LatexEditor
              value={latexContent}
              onChange={setLatexContent}
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
            />
          </div>

          {/* Боковая панель - 2 колонки */}
          <div className="xl:col-span-2 space-y-6">
            <FontControls
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              onFontSizeChange={setFontSize}
              onFontFamilyChange={setFontFamily}
              onFontWeightChange={setFontWeight}
            />

            <ExportPanel
              latexContent={latexContent}
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
            />

            <FormulaLibrary onSelectFormula={setLatexContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
