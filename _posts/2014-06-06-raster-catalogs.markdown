---
layout: post
title:  "Raster Catalogs"
date:   2014-06-06 08:00:00
tags: esri
---
Here I explain how to create a raster catalog in order to have a mosaic of a set of images. This way you can always add or change the images instead of just creating a static mosaic. I also find it much easier than dealing with the other ways of creating mosaic catalogs, etc.

1. Make sure all of your rasters are referenced, if not it will throw off the zoom to layer function once the raster catalog is complete.

2. Open ArcCatalog

3. Right click on the target database in the TOC or inside the database in the contents view and click New – Raster Catalog.

4. You will be presented with a dialogue, give the raster catalog a name, then you have to set the coordinate system. If you just set the first one, it will fill in the second one as the same coordinate system (new in 10.1).

5. Set the Raster Management Type to UNMANAGED. This is key, as 'managed' will copy all the rasters into the database with no chance to set the settings for image quality or type, and will result in much larger rasters than needed. The 'unmanaged' just points the catalog to where the actual images are located, this way you can edit the images later if you need to. However, now you have to make sure you do not move your images. I have a folder tree that has the raster catalog database in the root of the folder, and the images organized into folders in the same root folder.

6. Leave the other items in there as is. Click Okay.

7. It will create the catalog in the background. When done right click on the catalog and select Load – Raster Datasets. In the Input Rasters box navigate to the folder where your images are stored and select your images. I prefer to also set the Environments variable at the bottom of the advanced screen to not have it build pyramids. Pyramids may or may not achieve greater speed in drawing the rasters, but I do not think it is necessary for small images, i.e. under 500mb. Leave everything else as is.

8. Bring your raster catalog into ArcMap.

9. Depending on if your rasters are jpgs or tifs you will want to set the symbology no data value to 255 for jpgs, or 255 some tifs, 1 for other tifs (if they are cg4 b&w) also some jpgs are may need it set to 254. Also you can mess with the stretch type, I usually use none, but anything will work. This allows the edges of your rasters to become transparent, so that you do not have to be exact in clipping the rasters.

10. Then go into display, re-sample, and check bilinear interpretation – this makes the rasters draw more smoothly, then make the wire frames visible however you like.

11. Save this as a layer file if needed or just save your mxd.

DONE!
