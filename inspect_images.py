import os
import struct

def get_image_info(filepath):
    """Returns (format, (width, height)) or (None, None)"""
    with open(filepath, 'rb') as f:
        head = f.read(24)
        if len(head) < 24:
            return None, None
        
        # Check for PNG signature
        if head.startswith(b'\x89PNG\r\n\x1a\n'):
            if head[12:16] == b'IHDR':
                w, h = struct.unpack('>ii', head[16:24])
                return 'PNG', (w, h)
            
        # Check for JPEG (starts with FFD8)
        if head.startswith(b'\xff\xd8'):
            # Parse JPEG markers
            f.seek(2)
            while True:
                marker = f.read(2)
                if len(marker) < 2:
                    break
                if marker[0] != 0xff:
                    # Sync error or garbage
                    break
                marker_type = marker[1]
                if marker_type in [0xd8, 0xd9, 0x01]:  # SOI, EOI, TEM
                    continue
                # Read length
                len_bytes = f.read(2)
                if len(len_bytes) < 2:
                    break
                segment_len = struct.unpack('>H', len_bytes)[0]
                # If it's a Start of Frame marker, get width and height
                if 0xc0 <= marker_type <= 0xcf and marker_type not in [0xc4, 0xc8, 0xcc]:
                    sof_data = f.read(5)
                    if len(sof_data) < 5:
                        break
                    # precision = sof_data[0]
                    h, w = struct.unpack('>HH', sof_data[1:5])
                    return 'JPEG', (w, h)
                else:
                    # Skip segment data
                    f.seek(segment_len - 2, os.SEEK_CUR)
                    
    return None, None

image_dir = r"assets\images"
images_to_check = [
    "0476e001a378c900323c74c95e28228c.jpg",
    "0b8ceef85f9961e4337e3a9b673a0aa4.jpg",
    "0d2317d777b944fa11339f6be5d1a76c.jpg",
    "1efbc4ff6d213fe94b919966a0dc9908.jpg",
    "763fd82a02c406c6fdf3c8a52df34644.jpg",
    "8ed720050db5a25621fbbc308c388872.jpg",
    "c96c450879903640144b7eda47b73007.jpg",
    "d9e31f655bfd5b83954627e21f26995f.jpg",
    "de76a21a44178490817cd551afd862ff.jpg",
    "poster-damsel.jpg",
    "poster-enola-holmes-2.png",
    "poster-enola-holmes.jpg",
    "poster-godzilla-kotm.png",
    "poster-godzilla-vs-kong.png"
]

for img_name in images_to_check:
    path = os.path.join(image_dir, img_name)
    if os.path.exists(path):
        try:
            fmt, size = get_image_info(path)
            print(f"{img_name}: format={fmt}, size={size}")
        except Exception as e:
            print(f"{img_name}: Error: {e}")
    else:
        print(f"{img_name}: Does not exist")
