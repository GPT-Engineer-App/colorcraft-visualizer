# Welcome to your GPT Engineer project

## Project info

**Project**: colorcraft-visualizer 

**URL**: https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve

**Description**: Make me a tool to help me edit colours in material themes. Below is an example of a material theme. I should be able to:

1. Preview the colours on relevant components in real-time
2. Edit colours with a visual colour picker
3. Export to a .json file

here is an example .json theme:

{
    "dark": false,
    "roundness": 4,
    "version": 3,
    "isV3": true,
    "colors": {
        "primary": "#005AC1",
        "onPrimary": "rgb(255, 255,255)",
        "primaryContainer": "rgb(197,231,255)",
        "onPrimaryContainer": "rgb(0,30,45)",
        "secondary": "rgb(78,97,s110)",
        "onSecondary": "rgb(255,255,255)",
        "secondaryContainer": "rgb(209,229,245)",
        "onSecondaryContainer": "rgb(10,30,41)",
        "tertiary": "rgb(122,89,0)",
        "onTertiary": "rgb(255,255,255)",
        "tertiaryContainer": "rgb(255,222,163)",
        "onTertiaryContainer": "rgb(38,25,0)",
        "error": "rgb(186,26,26)",
        "onError": "rgb(255,255,255)",
        "errorContainer": "rgb(255,218,214)",
        "onErrorContainer": "rgb(65,0,2)",
        "background": "#FFFFFF",
        "onBackground": "rgb(25,28,30)",
        "surface": "rgb(251,252,255)",
        "onSurface": "rgb(25,28,30)",
        "surfaceVariant": "rgb(221,227,234)",
        "onSurfaceVariant": "rgb(65,72,77)",
        "outline": "rgb(113,120,126)",
        "outlineVariant": "rgb(193,199,206)",
        "shadow": "rgb(0,0,0)",
        "scrim": "rgb(0,0,0)",
        "inverseSurface": "rgb(46,49,51)",
        "inverseOnSurface": "rgb(240,241,243)",
        "inversePrimary": "rgb(127,208,255)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(238,244,249)",
            "level2": "rgb(231,240,246)",
            "level3": "rgb(223,235,242)",
            "level4": "rgb(221,234,241)",
            "level5": "rgb(216,231,239)"
        },
        "surfaceDisabled": "rgba(25,28,30,0.12)",
        "onSurfaceDisabled": "rgba(25,28,30,0.38)",
        "backdrop": "rgba(42,49,54,0.4)",
        "black": "#000000",
        "exploroOrange": "#FF5500",
        "googleBlue": "#4285F4",
        "googleGreen": "#0F9D58",
        "googleRed": "#DB4437",
        "googleYellow": "#F4B400",
        "white": "#FFFFFF"
    },
    "fonts": {
        "displayLarge": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 64,
            "fontSize": 57
        },
        "displayMedium": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 52,
            "fontSize": 45
        },
        "displaySmall": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 44,
            "fontSize": 36
        },
        "headlineLarge": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 40,
            "fontSize": 32
        },
        "headlineMedium": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 36,
            "fontSize": 28
        },
        "headlineSmall": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 32,
            "fontSize": 24
        },
        "titleLarge": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400",
            "lineHeight": 28,
            "fontSize": 22
        },
        "titleMedium": {
            "fontFamily": "System",
            "letterSpacing": 0.15,
            "fontWeight": "500",
            "lineHeight": 24,
            "fontSize": 16
        },
        "titleSmall": {
            "fontFamily": "System",
            "letterSpacing": 0.1,
            "fontWeight": "500",
            "lineHeight": 20,
            "fontSize": 14
        },
        "labelLarge": {
            "fontFamily": "System",
            "letterSpacing": 0.1,
            "fontWeight": "500",
            "lineHeight": 20,
            "fontSize": 14
        },
        "labelMedium": {
            "fontFamily": "System",
            "letterSpacing": 0.5,
            "fontWeight": "500",
            "lineHeight": 16,
            "fontSize": 12
        },
        "labelSmall": {
            "fontFamily": "System",
            "letterSpacing": 0.5,
            "fontWeight": "500",
            "lineHeight": 16,
            "fontSize": 11
        },
        "bodyLarge": {
            "fontFamily": "System",
            "letterSpacing": 0.15,
            "fontWeight": "400",
            "lineHeight": 24,
            "fontSize": 16
        },
        "bodyMedium": {
            "fontFamily": "System",
            "letterSpacing": 0.25,
            "fontWeight": "400",
            "lineHeight": 20,
            "fontSize": 14
        },
        "bodySmall": {
            "fontFamily": "System",
            "letterSpacing": 0.4,
            "fontWeight": "400",
            "lineHeight": 16,
            "fontSize": 12
        },
        "default": {
            "fontFamily": "System",
            "letterSpacing": 0,
            "fontWeight": "400"
        }
    },
    "animation": {
        "scale": 1
    }
}
 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/colorcraft-visualizer.git
cd colorcraft-visualizer
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/REPLACE_WITH_PROJECT_ID/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)