---
layout: post
title: "Google Drive Fusion Tables"
tags: esri google
---

Recently I had to do a series of field checks scattered throughout the city. There are several ways one could tackle this task in order to create a table of all the locations and find a good route. There are mobile apps, various websites, utilizing google maps (10 location limit) or using tools within ArcMap. I could have also utilized our own address database, or our customer database, selected all 20 entries and gone from there. However, I thought this would be a great opportunity to test out Google's new fusion tables/mapping feature.

Here are the steps, which are not as straight forward as one may think:

1. Create the fusion table with a location field and a name field, with Name being a text field, and it must be the first column to enable labelling in Google Earth

2. Geocode the table by clicking on the map tab. You will get better results if you have added a city/zip to the address field.

3. While in the map tab, export the map.

4. Open the file Google Earth and change the scale of the text to whatever you want, greater than 0 so you can see it.

5. And if you want to open this set of points in ArcMap - Save Place As...kmz

6. In ArcMap, Conversion Tools/KML to Layer then select your kmz

There you have it, a quick way to geocode a series of points using Google!
