import numpy as np
from PIL import Image, ImageFilter

def transform_logo_exact():
    input_path = "marketing/03-content/brand-assets/logo-landscape-crop.PNG"
    output_path = "marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png"
    
    orig = Image.open(input_path).convert("RGBA")
    data = np.array(orig)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # 1. Detect content bounding box (ignoring white background)
    is_bg = (r > 230) & (g > 230) & (b > 230)
    is_content = (~is_bg) & (a > 20)
    
    rows = np.any(is_content, axis=1)
    cols = np.any(is_content, axis=0)
    
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    # Add subtle 6px padding
    ymin = max(0, ymin - 6)
    ymax = min(orig.height, ymax + 6)
    xmin = max(0, xmin - 6)
    xmax = min(orig.width, xmax + 6)
    
    cropped = orig.crop((xmin, ymin, xmax, ymax))
    cdata = np.array(cropped, dtype=np.float32)
    cr, cg, cb = cdata[:, :, 0], cdata[:, :, 1], cdata[:, :, 2]
    
    # Background in cropped
    cis_bg = (cr > 230) & (cg > 230) & (cb > 230)
    ccontent = (~cis_bg)
    
    # Separation:
    # 1. Original Blue parts -> Electric Cyan (#00D2FF)
    #    ("Total", "Support", & Outer Circle left arc)
    is_blue_part = ccontent & ((cb - cr > 38) | ((cb > 95) & (cb - cr > 22)))
    
    # 2. Original Black/Dark parts -> Crisp Pure White (#FFFFFF)
    #    ("Biz", Inner Cog/Gear, & Outer Circle right arc)
    is_black_part = ccontent & (~is_blue_part)
    
    out_data = np.zeros((cropped.height, cropped.width, 4), dtype=np.uint8)
    
    # Apply colors
    for y in range(cropped.height):
        for x in range(cropped.width):
            if cis_bg[y, x]:
                out_data[y, x] = [0, 0, 0, 0]
            elif is_blue_part[y, x]:
                # Electric Cyan (#00D2FF)
                out_data[y, x] = [0, 210, 255, 255]
            else:
                # Crisp Pure White (#FFFFFF)
                out_data[y, x] = [255, 255, 255, 255]
                
    result = Image.fromarray(out_data, "RGBA")
    
    # Smooth edges with subtle anti-aliasing
    alpha_mask = Image.fromarray(((~cis_bg) * 255).astype(np.uint8), "L")
    alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(0.35))
    result.putalpha(alpha_mask)
    
    result.save(output_path, "PNG")
    print(f"Successfully generated exact two-tone brand logo at: {output_path}")

if __name__ == "__main__":
    transform_logo_exact()
