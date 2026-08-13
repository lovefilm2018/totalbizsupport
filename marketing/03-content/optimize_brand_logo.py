import numpy as np
from PIL import Image, ImageFilter, ImageOps

def process_and_trim(input_path, output_path):
    print(f"Reading: {input_path}")
    orig = Image.open(input_path).convert("RGBA")
    
    # 1. Detect content mask by non-white pixels
    data = np.array(orig)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Pixel is content if it is NOT white/near-white and has alpha
    is_content = ((r < 235) | (g < 235) | (b < 235)) & (a > 20)
    
    # Find bounding box of content
    rows = np.any(is_content, axis=1)
    cols = np.any(is_content, axis=0)
    
    if not np.any(rows) or not np.any(cols):
        print("No content found!")
        return
        
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    # Add slight 8px margin
    ymin = max(0, ymin - 8)
    ymax = min(orig.height, ymax + 8)
    xmin = max(0, xmin - 8)
    xmax = min(orig.width, xmax + 8)
    
    cropped = orig.crop((xmin, ymin, xmax, ymax))
    print(f"Tight cropped from {orig.size} to {cropped.size} (BBox: {xmin},{ymin} to {xmax},{ymax})")
    
    cdata = np.array(cropped, dtype=np.float32)
    cr, cg, cb = cdata[:, :, 0], cdata[:, :, 1], cdata[:, :, 2]
    
    cbrightness = (cr + cg + cb) / 3.0
    is_bg = (cr > 235) & (cg > 235) & (cb > 235)
    
    # Classification:
    # Navy / Dark Blue (low brightness or distinct blue dominance) -> Vibrant Electric Cyan (#00D2FF / #00A3FF)
    is_navy = ((cb > cr + 10) | (cbrightness < 115)) & (~is_bg)
    
    # Grey / Slate -> Crisp Pure White (#FFFFFF)
    is_slate = (~is_navy) & (~is_bg)
    
    out_data = np.zeros_like(cdata, dtype=np.uint8)
    
    for y in range(cdata.shape[0]):
        for x in range(cdata.shape[1]):
            if is_bg[y, x]:
                out_data[y, x] = [0, 0, 0, 0]
            elif is_navy[y, x]:
                # Vibrant Electric Cyan / Blue (#00D2FF)
                out_data[y, x] = [0, 210, 255, 255]
            else:
                # Crisp Pure White (#FFFFFF)
                out_data[y, x] = [255, 255, 255, 255]
                
    result = Image.fromarray(out_data, "RGBA")
    
    # Smooth edges with subtle anti-aliasing
    alpha_mask = Image.fromarray(((~is_bg) * 255).astype(np.uint8), "L")
    alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(0.35))
    result.putalpha(alpha_mask)
    
    result.save(output_path, "PNG")
    print(f"Saved optimized tight logo to: {output_path}")

if __name__ == "__main__":
    process_and_trim(
        "marketing/03-content/brand-assets/logo-landscape-crop.PNG",
        "marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png"
    )
