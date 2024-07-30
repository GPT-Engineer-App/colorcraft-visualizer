import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialTheme = {
  dark: false,
  roundness: 4,
  version: 3,
  isV3: true,
  colors: {
    primary: "#005AC1",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(197, 231, 255)",
    onPrimaryContainer: "rgb(0, 30, 45)",
    secondary: "rgb(78, 97, 110)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(209, 229, 245)",
    onSecondaryContainer: "rgb(10, 30, 41)",
    background: "#FFFFFF",
    onBackground: "rgb(25, 28, 30)",
    surface: "rgb(251, 252, 255)",
    onSurface: "rgb(25, 28, 30)",
  },
};

const ThemeEditor = () => {
  const [theme, setTheme] = useState(initialTheme);
  const [selectedColor, setSelectedColor] = useState('primary');

  const handleColorChange = (color) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      colors: {
        ...prevTheme.colors,
        [selectedColor]: color,
      },
    }));
  };

  const exportTheme = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(theme, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "theme.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Material Theme Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Color Picker</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="colorSelect">Select color to edit:</Label>
              <select
                id="colorSelect"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              >
                {Object.keys(theme.colors).map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
              <HexColorPicker color={theme.colors[selectedColor]} onChange={handleColorChange} />
              <Input
                type="text"
                value={theme.colors[selectedColor]}
                onChange={(e) => handleColorChange(e.target.value)}
                className="mt-4"
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div style={{ backgroundColor: theme.colors.primary, color: theme.colors.onPrimary }} className="p-4 rounded">
                  Primary
                </div>
                <div style={{ backgroundColor: theme.colors.primaryContainer, color: theme.colors.onPrimaryContainer }} className="p-4 rounded">
                  Primary Container
                </div>
                <div style={{ backgroundColor: theme.colors.secondary, color: theme.colors.onSecondary }} className="p-4 rounded">
                  Secondary
                </div>
                <div style={{ backgroundColor: theme.colors.secondaryContainer, color: theme.colors.onSecondaryContainer }} className="p-4 rounded">
                  Secondary Container
                </div>
                <div style={{ backgroundColor: theme.colors.background, color: theme.colors.onBackground }} className="p-4 rounded">
                  Background
                </div>
                <div style={{ backgroundColor: theme.colors.surface, color: theme.colors.onSurface }} className="p-4 rounded">
                  Surface
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button onClick={exportTheme} className="mt-4">Export Theme</Button>
    </div>
  );
};

export default ThemeEditor;
