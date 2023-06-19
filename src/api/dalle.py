import os
import openai
import base64
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-prompt", "--p", help="Your text prompt")
parser.add_argument("-number", "--n", help="Number of images, upwards of four", default=3)
parser.add_argument("-size", "--s", help="Image size: 256, 512 or 1024", default=512)

args = parser.parse_args()

openai.api_key = os.getenv("OPENAI_API_KEY")

output = openai.Image.create(
    prompt=(args.prompt),
    n=int(args.number),
    size=f'{args.size}x{args.size}',
    response_format="b64_json"
)

for i in range(0, len(output['data'])):
    b64 = output['data'][i]['b64_json']
    with open(f'image_{i}.png', 'wb') as f:
        f.write(base64.urlsafe_b64decode(b64))