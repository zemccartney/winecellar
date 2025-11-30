# Wine Cellar

Archive of fancy wines tried

## Install

`npm run setup`, not `npm install`

This ensures lavamoat runs allowed install scripts and links in allowed binaries

## Maintenance

### Adding a wine

1. Look up wine's maker, creating a new file under `content/makers` if no wines
   tried from them
   - do your best w/ looking up coordinates
   - write down any interesting findings in markdown body

2. Add to `wines.json`
   - note color from screenshot, using color picker (plug hex into
     https://oklch.com/)
   - use maker id (filename / slug) from step 1

3. Noting wine's vintage, add a folder using the wine's id to
   `content/vintages`, within that adding a file and image titled according to
   the vintage (year) e.g. `2023.mdx` and `2023.png`

### Convert HEIC image to PNG

On a Mac; given taking pictures on my phone, then airdropping to laptop, and
Apple stores images as HEIC for some reason.

1. Right click file
2. "Quick Actions" > "Convert Image"
3. In the resulting dialog, select "PNG" as format, leave other options as-is
   ("Actual Size" for size, "Preserve Metadata" checked)
4. Submit; new png version of file lands in same folder as HEIC file
