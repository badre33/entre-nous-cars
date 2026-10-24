"""Generate display-sized WebP copies; preserve approved originals (Pillow required)."""
from pathlib import Path
from PIL import Image
import json
root = Path(__file__).resolve().parents[1] / 'public/vehicles/benatna'
output = root / 'responsive'
output.mkdir(exist_ok=True)
original = 0
variants = {480: 0, 960: 0}
for path in sorted(root.glob('*.webp')):
    original += path.stat().st_size
    with Image.open(path) as image:
        for width in variants:
            height = round(image.height * width / image.width)
            target = output / f'{path.stem}-{width}.webp'
            image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=82, method=6)
            variants[width] += target.stat().st_size
print(json.dumps({'models':len(list(root.glob('*.webp'))),'originalBytes':original,'variantBytes':variants}))
