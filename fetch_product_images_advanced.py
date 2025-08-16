#!/usr/bin/env python3
"""
Advanced script to fetch Google images for products in catalog.json using BeautifulSoup.
This version provides better image extraction from Google search results.
"""

import json
import os
import requests
import time
from urllib.parse import quote_plus, urljoin, urlparse
import re
from bs4 import BeautifulSoup
import base64

def search_google_images_advanced(query):
    """
    Search for images using Google Images with BeautifulSoup parsing.
    """
    try:
        search_url = f"https://www.google.com/search?q={quote_plus(query)}&tbm=isch&hl=en"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        response = requests.get(search_url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Look for image URLs in various formats
        img_urls = []
        
        # Method 1: Look for img tags with data-src or src attributes
        img_tags = soup.find_all('img')
        for img in img_tags:
            src = img.get('src') or img.get('data-src')
            if src and src.startswith('http') and any(ext in src.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                img_urls.append(src)
        
        # Method 2: Look for JSON data in script tags
        scripts = soup.find_all('script')
        for script in scripts:
            if script.string:
                # Look for image URLs in script content
                urls = re.findall(r'https://[^"\s]+\.(?:jpg|jpeg|png|webp)', script.string)
                img_urls.extend(urls)
        
        # Method 3: Look for base64 encoded images
        for img in img_tags:
            src = img.get('src') or img.get('data-src')
            if src and src.startswith('data:image'):
                # This is a base64 encoded image, we can decode it
                try:
                    # Extract the base64 part
                    header, encoded = src.split(",", 1)
                    img_data = base64.b64decode(encoded)
                    
                    # Save it directly
                    filename = f"base64_{len(img_urls)}.jpg"
                    with open(f"public/images/{filename}", 'wb') as f:
                        f.write(img_data)
                    
                    img_urls.append(f"/images/{filename}")
                except:
                    continue
        
        # Remove duplicates and return the first valid URL
        unique_urls = list(dict.fromkeys(img_urls))
        
        if unique_urls:
            return unique_urls[0]
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
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/',
        }
        
        # If it's already a local path, skip download
        if url.startswith('/'):
            return True
        
        response = requests.get(url, headers=headers, timeout=20, stream=True)
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
    # Remove multiple underscores
    sanitized = re.sub(r'_+', '_', sanitized)
    # Remove leading/trailing underscores
    sanitized = sanitized.strip('_')
    # Limit length
    if len(sanitized) > 80:
        sanitized = sanitized[:80]
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
    print(f"Images will be saved to: {images_dir}/")
    
    # Process each product
    updated_catalog = []
    success_count = 0
    
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
            success_count += 1
            continue
        
        # Search for image
        search_query = f"{product_name} product food grocery"
        print(f"  Searching for: {search_query}")
        
        image_url = search_google_images_advanced(search_query)
        
        if image_url:
            print(f"  Found image: {image_url}")
            
            # If it's already a local path (from base64), use it directly
            if image_url.startswith('/'):
                product['image'] = image_url
                print(f"  ✓ Using local image: {image_url}")
                success_count += 1
            else:
                # Download image
                if download_image(image_url, local_file_path):
                    print(f"  ✓ Downloaded: {local_image_path}")
                    product['image'] = local_image_path
                    success_count += 1
                else:
                    print(f"  ✗ Failed to download image")
                    # Keep original image URL as fallback
        else:
            print(f"  ✗ No image found")
            # Keep original image URL as fallback
        
        updated_catalog.append(product)
        
        # Add delay to be respectful to servers
        time.sleep(2)
    
    # Save updated catalog
    try:
        with open(catalog_path, 'w', encoding='utf-8') as f:
            json.dump(updated_catalog, f, indent=2, ensure_ascii=False)
        print(f"\n✓ Updated catalog saved to {catalog_path}")
    except Exception as e:
        print(f"\n✗ Error saving catalog: {e}")
    
    print(f"\nScript completed!")
    print(f"Successfully processed: {success_count}/{len(catalog)} products")
    print(f"Images saved to: {images_dir}/")

if __name__ == "__main__":
    main()
