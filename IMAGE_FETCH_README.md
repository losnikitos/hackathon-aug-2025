# Product Image Fetcher

This directory contains Python scripts to fetch product images from Google and save them locally for your Next.js grocery store application.

## Files

- `fetch_product_images.py` - Basic version using regex pattern matching
- `fetch_product_images_advanced.py` - Advanced version using BeautifulSoup (recommended)
- `requirements.txt` - Python dependencies
- `IMAGE_FETCH_README.md` - This file

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Make sure you're in the project root directory** (where `app/` and `public/` folders are located)

## Usage

### Basic Version
```bash
python fetch_product_images.py
```

### Advanced Version (Recommended)
```bash
python fetch_product_images_advanced.py
```

## What the script does

1. **Reads** the product catalog from `app/data/catalog.json`
2. **Searches** Google Images for each product using the product name + "product food grocery"
3. **Downloads** the first image result for each product
4. **Saves** images to `public/images/` directory
5. **Updates** the catalog.json file with local image paths
6. **Skips** products that already have local images

## Features

- ✅ **Respectful scraping** - Includes delays between requests
- ✅ **Error handling** - Continues processing even if some images fail
- ✅ **Duplicate prevention** - Skips already downloaded images
- ✅ **Filename sanitization** - Creates valid filenames from product names
- ✅ **Fallback support** - Keeps original URLs if local download fails
- ✅ **Progress tracking** - Shows progress for each product

## Output

- Images are saved to: `public/images/`
- Filenames are based on product names (sanitized)
- Catalog is updated with local paths like: `/images/Fresh_Eggs_12_pcs.jpg`

## Notes

- The script uses web scraping techniques to find images
- Google may block requests if too many are made too quickly
- Consider using the Google Custom Search API for production use
- Images are saved as JPG format for consistency

## Troubleshooting

If you encounter issues:

1. **Rate limiting**: Increase the sleep delay in the script
2. **No images found**: Try running the advanced version
3. **Permission errors**: Make sure you have write access to the `public/` directory
4. **Network issues**: Check your internet connection

## Alternative: Google Custom Search API

For more reliable results, consider using the Google Custom Search API:

1. Get an API key from Google Cloud Console
2. Enable Custom Search API
3. Create a Custom Search Engine
4. Modify the script to use the API instead of scraping

This would provide more reliable and faster results, but requires API setup and may have usage limits.
