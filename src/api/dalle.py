from flask import Flask, request, send_file
import os
import openai
import base64
import argparse
import io
import zipfile


app = Flask(__name__)

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


@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')
    number = data.get('number', 3)
    size = data.get('size', 512)

    output = openai.Image.create(
        prompt=prompt,
        n=int(number),
        size=f'{size}x{size}',
        response_format="b64_json"
    )

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED) as zip_file:
        for i in range(0, len(output['data'])):
            b64 = output['data'][i]['b64_json']
            image = base64.urlsafe_b64decode(b64)
            zip_file.writestr(f'image_{i}.png', image)

    zip_buffer.seek(0)
    return send_file(zip_buffer, mimetype='application/zip', as_attachment=True, attachment_filename='images.zip')
