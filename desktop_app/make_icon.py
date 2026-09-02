from pathlib import Path
from PIL import Image

assets = Path(__file__).parent / "assets"
source = Image.open(assets / "saiko-icon-512.png").convert("RGBA")
source.save(assets / "saiko-icon.ico", sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
