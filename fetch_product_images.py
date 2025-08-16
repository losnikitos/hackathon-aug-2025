#!/usr/bin/env python3
"""
Script to fetch Google images for products in catalog.json and save them locally.
"""

import json
import os
import requests
import time
from urllib.parse import quote_plus
import re
from pathlib import Path

def search_google_images(query, api_key=None):
    """
    Search for images using Google Custom Search API or fallback to web scraping.
    For this script, we'll use a simple approach with requests and BeautifulSoup.
    """
    try:
        # Use a simple image search approach
        search_url = f"https://www.google.com/search?q={quote_plus(query)}&tbm=isch"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Extract image URLs from the response
        # This is a simplified approach - in production you might want to use a proper API
        img_pattern = r'https://[^"]*\.(?:jpg|jpeg|png|webp)'
        img_urls = re.findall(img_pattern, response.text)
        
        if img_urls:
            return img_urls[0]  # Return the first image URL
        else:
            return None
            
    except Exception as e:
        print(f"Error searching for '{query}': {e}")
        return None

def download_image(url, filepath):
    """
    Download an image from URL and save it to the specified filepath.
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
        
    except Exception as e:
        print(f"Error downloading image from {url}: {e}")
        return False

def sanitize_filename(name):
    """
    Sanitize product name to create a valid filename.
    """
    # Remove or replace invalid characters
    sanitized = re.sub(r'[<>:"/\\|?*]', '_', name)
    # Replace spaces with underscores
    sanitized = sanitized.replace(' ', '_')
    # Limit length
    if len(sanitized) > 100:
        sanitized = sanitized[:100]
    return sanitized

def main():
    # Paths
    catalog_path = "app/data/catalog.json"
    images_dir = "public/images"
    
    # Create images directory if it doesn't exist
    os.makedirs(images_dir, exist_ok=True)
    
    # Load catalog
    try:
        with open(catalog_path, 'r', encoding='utf-8') as f:
            catalog = json.load(f)
    except FileNotFoundError:
        print(f"Error: {catalog_path} not found!")
        return
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return
    
    print(f"Found {len(catalog)} products in catalog")
    
    # Process each product
    updated_catalog = []
    
    for i, product in enumerate(catalog, 1):
        product_name = product['name']
        print(f"\n[{i}/{len(catalog)}] Processing: {product_name}")
        
        # Check if image already exists locally
        sanitized_name = sanitize_filename(product_name)
        local_image_path = f"/images/{sanitized_name}.jpg"
        local_file_path = os.path.join(images_dir, f"{sanitized_name}.jpg")
        
        if os.path.exists(local_file_path):
            print(f"  ✓ Image already exists: {local_image_path}")
            product['image'] = local_image_path
            updated_catalog.append(product)
            continue
        
        # Search for image
        search_query = f"{product_name} product food grocery"
        print(f"  Searching for: {search_query}")
        
        image_url = search_google_images(search_query)
        
        if image_url:
            print(f"  Found image: {image_url}")
            
            # Download image
            if download_image(image_url, local_file_path):
                print(f"  ✓ Downloaded: {local_image_path}")
                product['image'] = local_image_path
            else:
                print(f"  ✗ Failed to download image")
                # Keep original image URL as fallback
        else:
            print(f"  ✗ No image found")
            # Keep original image URL as fallback
        
        updated_catalog.append(product)
        
        # Add delay to be respectful to servers
        time.sleep(1)
    
    # Save updated catalog
    try:
        with open(catalog_path, 'w', encoding='utf-8') as f:
            json.dump(updated_catalog, f, indent=2, ensure_ascii=False)
        print(f"\n✓ Updated catalog saved to {catalog_path}")
    except Exception as e:
        print(f"\n✗ Error saving catalog: {e}")
    
    print(f"\nScript completed! Images saved to {images_dir}/")

if __name__ == "__main__":
    main()
