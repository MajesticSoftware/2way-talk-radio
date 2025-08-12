# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
2WayTalk is a static website for a radio show on WFBR 1590 AM, featuring extensive animations and interactive elements. No build tools or frameworks - pure HTML/CSS/JavaScript.

## Development Commands
- **Run locally**: Open `index.html` directly in browser
- **Deploy**: Push to main branch (auto-deploys to Vercel)
- **No build/test/lint commands** - this is a static site with no package.json

## Architecture
The site uses multiple concurrent animation systems:
1. **CSS Animations**: Keyframes for text effects, guest cards, and UI elements
2. **JavaScript Particles**: Rising colored dots generated every 200ms
3. **Canvas Visualizations**: Wave animation and frequency scanner
4. **Interactive Elements**: Mouse-following microphone, ripple effects on links

### Key Files
- `index.html`: Main structure, guest cards (lines 54-91), footer info (lines 104-115)
- `script.js`: All animations and interactions within DOMContentLoaded listener
- `styles.css`: Complete styling with animation keyframes

### Animation Performance Patterns
- Uses `requestAnimationFrame` for 60fps animations
- Pauses animations when tab not visible (visibility change detection)
- Efficient DOM manipulation to minimize reflows

## Important Context
- **Live Status**: Shows "LIVE NOW" automatically during broadcast (Thursdays 12-1 PM)
- **Color Scheme**: Green (#00ff00), Red (#ff0000), Yellow (#ffeb3b) on dark (#1a1a1a)
- **Guest Cards**: Currently placeholder content - update in HTML when real guests confirmed
- **No Dependencies**: No npm, no frameworks - edit files directly