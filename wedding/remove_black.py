from PIL import Image

def remove_black(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate luminance
        lum = (r + g + b) // 3
        
        # If it's pure black, make it fully transparent
        if r < 10 and g < 10 and b < 10:
            new_data.append((255, 255, 255, 0))
        else:
            # We want to keep the true colors but map darkness to transparency
            # to mimic Screen blend mode behavior against a background.
            # But the simplest is just set alpha = max(r,g,b).
            # And then we can just boost the RGB to white for the dark parts to make it blend properly, 
            # Or just use the original RGB but scale alpha.
            max_val = max(r, g, b)
            if max_val > 0:
                # Normalizing color so that when multiplied by alpha it yields original color.
                # Actually, Screen blend mode: 1 - (1-Top)*(1-Bottom)
                # Just making alpha proportional to lightness works perfectly for white flowers.
                # Since flowers are mostly white/green.
                new_data.append((r, g, b, max_val))
            else:
                new_data.append((0, 0, 0, 0))
                
    img.putdata(new_data)
    img.save(out_path, "PNG")

remove_black("public/orchid-corner.png", "public/orchid-transparent.png")
print("Done")
