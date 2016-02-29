---
layout: page
title: Projects
subtitle: A list of my most recent web apps, print maps and misc projects.
description: A list of my most recent web apps, print maps and misc projects hosted on getBounds by Malcolm Meyer.
permalink: /projects/index.html
---
## Open Parcel Viewer

<img src="/images/parcel-img.png" width="50%" alt-text="Open Parcel Viewer"/>

A simple static html, javascript and jquery parcel web map, capable of rendering up to 50k polygons on deesktop and mobile. The app uses Leaflet as the mapping api and Jekyll to build the static pages. Color, initial map center/zoom and the search field are defined in the yaml front matter, with minimal to zero extra coding needed. The polygon should be in topojson format.

```javascript
layout: map
title: Parcel Viewer
data: parcels.topojson
zoom: 11
center: "38.8103,-82.3933"
split: " | "
indexnumber: 2
date: "2016-02-18"
color: orange
```
###[Live Link](https://ovrdc.github.io/parcel-viewer)

---

## Project 2
 - A
 - B
 - C

## Project 3
 - A
 - B
 - C
