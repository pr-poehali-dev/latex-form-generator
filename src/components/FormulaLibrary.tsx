import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormulaLibraryProps {
  onSelectFormula: (formula: string) => void;
}

const FormulaLibrary: React.FC<FormulaLibraryProps> = ({ onSelectFormula }) => {
  const formulas = [
    {
      name: "Квадратное уравнение",
      latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    },
    {
      name: "Интеграл",
      latex: "\\int_{a}^{b} f(x) dx = F(b) - F(a)",
    },
    {
      name: "Производная",
      latex: "\\frac{d}{dx}[f(x)] = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    },
    {
      name: "Формула Эйлера",
      latex: "e^{i\\pi} + 1 = 0",
    },
    {
      name: "Биномиальная теорема",
      latex: "(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k",
    },
    {
      name: "Матрица",
      latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
    },
    {
      name: "Система уравнений",
      latex: "\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}",
    },
    {
      name: "Предел",
      latex: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Библиотека формул</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {formulas.map((formula, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start text-left h-auto p-3"
              onClick={() => onSelectFormula(formula.latex)}
            >
              <div>
                <div className="font-medium text-sm">{formula.name}</div>
                <div className="text-xs text-gray-500 mt-1 font-mono">
                  {formula.latex.substring(0, 40)}...
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaLibrary;
