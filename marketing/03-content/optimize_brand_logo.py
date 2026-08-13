import numpy as np
from PIL import Image, ImageFilter

def process_twotone_logo():
    input_path = "marketing/03-content/brand-assets/logo-landscape-crop.PNG"
    output_path = "marketing/03-content/brand-assets/totalbiz_logo_electric_white_tight.png"
    
    orig = Image.open(input_path).convert("RGBA")
    data = np.array(orig)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # 1. Bounding box detection
    is_content = ((r < 235) | (g < 235) | (b < 235)) & (a > 20)
    rows = np.any(is_content, axis=1)
    cols = np.any(is_content, axis=0)
    
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    ymin = max(0, ymin - 8)
    ymax = min(orig.height, ymax + 8)
    xmin = max(0, xmin - 8)
    xmax = min(orig.width, xmax + 8)
    
    cropped = orig.crop((xmin, ymin, xmax, ymax))
    cdata = np.array(cropped, dtype=np.float32)
    cr, cg, cb = cdata[:, :, 0], cdata[:, :, 1], cdata[:, :, 2]
    
    # White background detection
    is_bg = (cr > 235) & (cg > 235) & (cb > 235)
    
    # Color distinction:
    # Blue saturation: blue is significantly greater than red (cb - cr > 12)
    # Grey saturation: red, green, blue are very close to each other (abs(cb - cr) <= 12)
    diff_b_r = cb - cr
    
    is_blue = (diff_b_r >= 14) & (~is_bg)
    is_grey = (~is_blue) & (~is_bg)
    
    out_data = np.zeros_like(cdata, dtype=np.uint8)
    
    for y in range(cdata.shape[0]):
        for x in range(cdata.shape[1]):
            if is_bg[y, x]:
                out_data[y, x] = [0, 0, 0, 0]
            elif is_blue[y, x]:
                # Electric Cyan (#00D2FF) for "Total" and Left Arc
                out_data[y, x] = [0, 210, 255, 255]
            else:
                # Crisp Pure White (#FFFFFF) for "Biz", "Support", Cog & Right Arc
                out_data[y, x] = [255, 255, 255, 255]
                
    result = Image.fromarray(out_data, "RGBA")
    
    # Smooth edges with subtle anti-aliasing
    alpha_mask = Image.fromarray(((~is_bg) * 255).astype(np.uint8), "L")
    alpha_mask = alpha_mask.filter(ImageFilter.GaussianBlur(0.35))
    result.putalpha(alpha_mask)
    
    result.save(output_path, "PNG")
    print(f"Saved true two-tone logo (Electric Cyan 'Total' + Pure White 'Biz/Support/Cog') to: {output_path}")

if __name__ == "__main__":
    process_twotone_logo()
