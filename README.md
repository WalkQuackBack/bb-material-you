# Material 3 Theme x.x.x

This is a highly customizable Material 3 theme, which uses the Material Design color tokens and follows the Material principles.

You can read up on the Material 3 Design specs here:
https://m3.material.io/

## Theme variants

TODO: Migrate to new Material Foundation based system DONE 1/22/2025

Color themes
!!! Don't move anything around here. Documentation relies on order

### New theme options:

-   Colours into folders (themes/\<color>/variant)
    -   lime
        -   All variants available
    -   purple
        -   All variants available
    -   red
        -   All variants available
    -   bb-blue
        -   All variants available
-   Variants:
    -   dark
    -   dark-mc
    -   dark-hc
    -   light
    -   light-mc
    -   light-hc
-   Extras
    -   High Contrast `theme/core/highContrast`
    -   Roboto Font `theme/core/robotoTypescale`
    -   Assistant Font `theme/core/assistantTypescale`

## Development

### Preresquites

-   [Node.js](https://nodejs.org/)
-   [Sass](https://sass-lang.com/install/)
-   [Live Dev Reloader](ADDLINK) Blockbench Plugin
    -   Only necessary if wants hot reload

Pull the necessary local development modules

```bash
	npm install -g sass
	npm install
```

### Hot reload dev

Run the hot reload build script, changes will end up in `main.css` file in root directory.

Theme is modifiable from within file

```bash
    compile.cmd
```

Watch `main.css` file with Hot Dev Reloader plugin, using action `Watch plugin or CSS file`

### Building

Run the compiler script. Theme files will be in `dist` directory

```bash
	npm run build
```

# Precompiled release README

## Credits

**TODO: add proper credits**

_Some of the code for this theme is forked off of Cherrybox from Lucas-W (on PlanetMinecraft)_

## Intro

Here's the basics of customizing this theme.

You'll find a order of components that can be followed to find what you're looking for. Here's the order, from top to bottom.

-   Animations and keyframes

-   Most basic components (buttons, dropdowns)
-   Context menus
-   Panels

-   Action selector
-   Outliner
-   Start screen
-   Dialogs (sidebars, buttons, rearrangements)
-   Project tabs
-   Plugin specific and compatibility CSS
-   Material 3 token CSS (this'll be covered in another section. don't try to modify this directly)
-   General CSS which applies to most of the application

## Material Tokens

All of the default Material themes included are compiled using color tokens. You can read about them here: https://m3.material.io/styles/color/system/how-the-system-works

### How to change the color theme

**If you're switching the theme from dark to light or vice versa, changing the tokens is not reconmended. You can get a copy of the theme that already has light mode or dark mode where you originally got the theme.**

Generate color tokens by going to [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/) and either choosing a source image, or choosing a source color to generate a theme.

Change it around until you're happy with the result, and click `Export`. Choose `Web (CSS)`, and a zip file will download. Unzip the file. In the `css` folder, copy the contents of the `theme.<variant>.css` file.

You'll need to insert them in between the two comments `"Material tokens start here"` and `"Material tokens end here"`.

Scroll down to the bottom, then scroll up until you see the **starting comment**. Drag and select until the **ending comment**, and press CTRL/CMD+V to paste in the tokens.

The theme should update to use your tokens.
