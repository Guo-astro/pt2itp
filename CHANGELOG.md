### v2.5.3
- Parse integers from --xy as internal functions expect integers

### v2.5.2
- Add split test

### v2.5.1
- Add expansive tests to bring coverage from ~50% to ~85%
- Change debug output slightly to be able to better generate unit tests

### v2.5.0

- Add name mode which will dump unnamed streets, when combined with the --debug flag it will also include the 2 address clusters which have the highest probability of having the correct street name.
- Add --raw <TYPE> mode which allows dumping of address data in a given tile (works for map and name mode ToDo allow streets & \*)
- Add plurals as aliases so I have to check my own docs less

### v2.4.2

- Retain `carmen:text` field in cluster module

### v2.4.1

- Fix bug in explode.js where explode would silently drop a LineString if it was the last unconnected LineString in a MultiLineString.

### v2.4.0

- Add --zoom option to specify non-standard zoom
- Add --xy & --coords options to only process a single tile for debug work

### v2.3.0

- Use centroid verification to ensure calculated centroid is within tile
- Fall back from point-on-surface to centre of z14 tile

### v2.2.2

- Use centre coord to avoid being rejected by carmen's verify centroid

### v2.2.1

- Use first coord in linestring as carmen:center to avoid miscalculated centroids

### v2.2.0

- Add --map function which allows non-standard vector tiles to be mapped into the address/street standard defined in the readme
- Add demo qa-tiles mapper function

### v2.1.1

- Pin mapnik version to allow binary installation (3.5.13)

### v2.1.0

- Allow zooms other than 14.

### v2.0.0

- Output in carmen range format for easy indexing
- convert command now works with line delimited Features or FeatureCollections
- Support non-continuous streets and divide addresses between them