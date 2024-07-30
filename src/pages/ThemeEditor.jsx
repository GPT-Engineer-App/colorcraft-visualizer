import React, { useState, useCallback } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from 'sonner';

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

const radixColors = {
  gray: ['#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#868e96', '#495057', '#343a40', '#212529'],
  red: ['#fff5f5', '#ffe3e3', '#ffc9c9', '#ffa8a8', '#ff8787', '#ff6b6b', '#fa5252', '#f03e3e', '#e03131', '#c92a2a'],
  pink: ['#fff0f6', '#ffdeeb', '#fcc2d7', '#faa2c1', '#f783ac', '#f06595', '#e64980', '#d6336c', '#c2255c', '#a61e4d'],
  grape: ['#f8f0fc', '#f3d9fa', '#eebefa', '#e599f7', '#da77f2', '#cc5de8', '#be4bdb', '#ae3ec9', '#9c36b5', '#862e9c'],
  violet: ['#f3f0ff', '#e5dbff', '#d0bfff', '#b197fc', '#9775fa', '#845ef7', '#7950f2', '#7048e8', '#6741d9', '#5f3dc4'],
  indigo: ['#edf2ff', '#dbe4ff', '#bac8ff', '#91a7ff', '#748ffc', '#5c7cfa', '#4c6ef5', '#4263eb', '#3b5bdb', '#364fc7'],
  blue: ['#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc', '#4dabf7', '#339af0', '#228be6', '#1c7ed6', '#1971c2', '#1864ab'],
  cyan: ['#e3fafc', '#c5f6fa', '#99e9f2', '#66d9e8', '#3bc9db', '#22b8cf', '#15aabf', '#1098ad', '#0c8599', '#0b7285'],
  teal: ['#e6fcf5', '#c3fae8', '#96f2d7', '#63e6be', '#38d9a9', '#20c997', '#12b886', '#0ca678', '#099268', '#087f5b'],
  green: ['#ebfbee', '#d3f9d8', '#b2f2bb', '#8ce99a', '#69db7c', '#51cf66', '#40c057', '#37b24d', '#2f9e44', '#2b8a3e'],
  lime: ['#f4fce3', '#e9fac8', '#d8f5a2', '#c0eb75', '#a9e34b', '#94d82d', '#82c91e', '#74b816', '#66a80f', '#5c940d'],
  yellow: ['#fff9db', '#fff3bf', '#ffec99', '#ffe066', '#ffd43b', '#fcc419', '#fab005', '#f59f00', '#f08c00', '#e67700'],
  orange: ['#fff4e6', '#ffe8cc', '#ffd8a8', '#ffc078', '#ffa94d', '#ff922b', '#fd7e14', '#f76707', '#e8590c', '#d9480f'],
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

  const copyToClipboard = useCallback((color) => {
    if (!navigator.clipboard) {
      toast.error('Clipboard API not supported');
      return;
    }
    navigator.clipboard.writeText(color)
      .then(() => {
        toast.success(`Copied ${color} to clipboard!`);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy color');
      });
  }, []);

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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Radix UI Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {Object.entries(radixColors).map(([colorName, shades]) => (
              <div key={colorName} className="space-y-2">
                <h3 className="text-sm font-semibold">{colorName}</h3>
                {shades.map((shade, index) => (
                  <Tooltip key={index} content={`Click to copy: ${shade}`}>
                    <div
                      className="w-8 h-8 rounded cursor-pointer"
                      style={{ backgroundColor: shade }}
                      onClick={() => copyToClipboard(shade)}
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
