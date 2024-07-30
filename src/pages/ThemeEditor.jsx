import React, { useState, useCallback, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const initialTheme = {
  dark: false,
  roundness: 4,
  version: 3,
  isV3: true,
  colors: {
    primary: "#005AC1",
    onPrimary: "#FFFFFF",
    primaryContainer: "#C5E7FF",
    onPrimaryContainer: "#001E2D",
    secondary: "#4E616E",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D1E5F5",
    onSecondaryContainer: "#0A1E29",
    tertiary: "#7A5900",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFDEA3",
    onTertiaryContainer: "#261900",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FFFFFF",
    onBackground: "#191C1E",
    surface: "#FBFCFF",
    onSurface: "#191C1E",
    surfaceVariant: "#DDE3EA",
    onSurfaceVariant: "#41484D",
    outline: "#71787E",
    outlineVariant: "#C1C7CE",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2E3133",
    inverseOnSurface: "#F0F1F3",
    inversePrimary: "#7FD0FF",
    elevation: {
      level0: "transparent",
      level1: "#EEF4F9",
      level2: "#E7F0F6",
      level3: "#DFF0F2",
      level4: "#DDF0F1",
      level5: "#D8E7EF"
    },
    surfaceDisabled: "#191C1E1F",
    onSurfaceDisabled: "#191C1E61",
    backdrop: "#2A31368C"
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState(initialTheme);
  const [selectedColor, setSelectedColor] = useState('primary');

  useEffect(() => {
    const colors = Object.fromEntries(searchParams.entries());
    if (Object.keys(colors).length > 0) {
      setTheme(prevTheme => ({
        ...prevTheme,
        colors: {
          ...prevTheme.colors,
          ...colors,
        },
      }));
    }
  }, [searchParams]);

  const handleColorChange = (color) => {
    setTheme(prevTheme => {
      const newTheme = {
        ...prevTheme,
        colors: {
          ...prevTheme.colors,
          [selectedColor]: color,
        },
      };
      if (selectedColor.startsWith('elevation.')) {
        const [, level] = selectedColor.split('.');
        newTheme.colors.elevation = {
          ...prevTheme.colors.elevation,
          [level]: color,
        };
      }
      updateUrlParams(newTheme.colors);
      return newTheme;
    });
  };

  const updateUrlParams = (colors) => {
    setSearchParams(colors);
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

  const hexToRgb = (hex) => {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgb(${r},${g},${b})`;
  };

  const convertColorsToRgb = (colors) => {
    const convertedColors = {};
    for (const [key, value] of Object.entries(colors)) {
      if (typeof value === 'string' && value.startsWith('#')) {
        convertedColors[key] = hexToRgb(value);
      } else if (typeof value === 'object') {
        convertedColors[key] = convertColorsToRgb(value);
      } else {
        convertedColors[key] = value;
      }
    }
    return convertedColors;
  };

  const exportTheme = () => {
    const exportedTheme = {
      dark: false,
      roundness: 4,
      version: 3,
      isV3: true,
      colors: convertColorsToRgb({
        ...theme.colors,
        tertiary: "rgb(122,89,0)",
        onTertiary: "rgb(255,255,255)",
        tertiaryContainer: "rgb(255,222,163)",
        onTertiaryContainer: "rgb(38,25,0)",
        error: "rgb(186,26,26)",
        onError: "rgb(255,255,255)",
        errorContainer: "rgb(255,218,214)",
        onErrorContainer: "rgb(65,0,2)",
        surfaceVariant: "rgb(221,227,234)",
        onSurfaceVariant: "rgb(65,72,77)",
        outline: "rgb(113,120,126)",
        outlineVariant: "rgb(193,199,206)",
        shadow: "rgb(0,0,0)",
        scrim: "rgb(0,0,0)",
        inverseSurface: "rgb(46,49,51)",
        inverseOnSurface: "rgb(240,241,243)",
        inversePrimary: "rgb(127,208,255)",
        elevation: {
          level0: "transparent",
          level1: "rgb(238,244,249)",
          level2: "rgb(231,240,246)",
          level3: "rgb(223,235,242)",
          level4: "rgb(221,234,241)",
          level5: "rgb(216,231,239)"
        },
        surfaceDisabled: "rgba(25,28,30,0.12)",
        onSurfaceDisabled: "rgba(25,28,30,0.38)",
        backdrop: "rgba(42,49,54,0.4)",
        black: "#000000",
        exploroOrange: "#FF5500",
        googleBlue: "#4285F4",
        googleGreen: "#0F9D58",
        googleRed: "#DB4437",
        googleYellow: "#F4B400",
        white: "#FFFFFF"
      }),
      fonts: {
        displayLarge: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 64,
          fontSize: 57
        },
        displayMedium: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 52,
          fontSize: 45
        },
        displaySmall: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 44,
          fontSize: 36
        },
        headlineLarge: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 40,
          fontSize: 32
        },
        headlineMedium: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 36,
          fontSize: 28
        },
        headlineSmall: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 32,
          fontSize: 24
        },
        titleLarge: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400",
          lineHeight: 28,
          fontSize: 22
        },
        titleMedium: {
          fontFamily: "System",
          letterSpacing: 0.15,
          fontWeight: "500",
          lineHeight: 24,
          fontSize: 16
        },
        titleSmall: {
          fontFamily: "System",
          letterSpacing: 0.1,
          fontWeight: "500",
          lineHeight: 20,
          fontSize: 14
        },
        labelLarge: {
          fontFamily: "System",
          letterSpacing: 0.1,
          fontWeight: "500",
          lineHeight: 20,
          fontSize: 14
        },
        labelMedium: {
          fontFamily: "System",
          letterSpacing: 0.5,
          fontWeight: "500",
          lineHeight: 16,
          fontSize: 12
        },
        labelSmall: {
          fontFamily: "System",
          letterSpacing: 0.5,
          fontWeight: "500",
          lineHeight: 16,
          fontSize: 11
        },
        bodyLarge: {
          fontFamily: "System",
          letterSpacing: 0.15,
          fontWeight: "400",
          lineHeight: 24,
          fontSize: 16
        },
        bodyMedium: {
          fontFamily: "System",
          letterSpacing: 0.25,
          fontWeight: "400",
          lineHeight: 20,
          fontSize: 14
        },
        bodySmall: {
          fontFamily: "System",
          letterSpacing: 0.4,
          fontWeight: "400",
          lineHeight: 16,
          fontSize: 12
        },
        default: {
          fontFamily: "System",
          letterSpacing: 0,
          fontWeight: "400"
        }
      },
      animation: {
        scale: 1
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportedTheme, null, 2));
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
                {Object.entries(theme.colors).flatMap(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    return Object.keys(value).map(subKey => (
                      <option key={`${key}.${subKey}`} value={`${key}.${subKey}`}>{`${key}.${subKey}`}</option>
                    ));
                  }
                  return <option key={key} value={key}>{key}</option>;
                })}
              </select>
              <HexColorPicker 
                color={selectedColor.includes('.') 
                  ? theme.colors[selectedColor.split('.')[0]][selectedColor.split('.')[1]] 
                  : theme.colors[selectedColor]} 
                onChange={handleColorChange} 
              />
              <Input
                type="text"
                value={selectedColor.includes('.') 
                  ? theme.colors[selectedColor.split('.')[0]][selectedColor.split('.')[1]] 
                  : theme.colors[selectedColor]}
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
                <div style={{ backgroundColor: theme.colors.tertiary, color: theme.colors.onTertiary }} className="p-4 rounded">
                  Tertiary
                </div>
                <div style={{ backgroundColor: theme.colors.tertiaryContainer, color: theme.colors.onTertiaryContainer }} className="p-4 rounded">
                  Tertiary Container
                </div>
                <div style={{ backgroundColor: theme.colors.error, color: theme.colors.onError }} className="p-4 rounded">
                  Error
                </div>
                <div style={{ backgroundColor: theme.colors.errorContainer, color: theme.colors.onErrorContainer }} className="p-4 rounded">
                  Error Container
                </div>
                <div style={{ backgroundColor: theme.colors.background, color: theme.colors.onBackground }} className="p-4 rounded">
                  Background
                </div>
                <div style={{ backgroundColor: theme.colors.surface, color: theme.colors.onSurface }} className="p-4 rounded">
                  Surface
                </div>
                <div style={{ backgroundColor: theme.colors.surfaceVariant, color: theme.colors.onSurfaceVariant }} className="p-4 rounded">
                  Surface Variant
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button onClick={exportTheme} className="mt-4 mr-2">Export Theme</Button>
      <Button onClick={() => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          toast.success('URL copied to clipboard!');
        }).catch((err) => {
          console.error('Could not copy URL: ', err);
          toast.error('Failed to copy URL');
        });
      }} className="mt-4">Share URL</Button>

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
