
Vector Tiles are an amazing advancement for web mapping, offering an efficient method of delivering both vector and attribute data to the client. However, the client cannot query tiles outside the viewport (or the viewport buffer), since this data has not yet been fetched by the client. In fact, this is the whole point of vector tiles, to only send the data needed to draw the geometry for the given zoom level and map bounds. So how do we go about querying data outside the viewport? 


