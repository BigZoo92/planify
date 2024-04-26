from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

app = Flask(__name__)

# Charger le modèle et le tokenizer
model = T5ForConditionalGeneration.from_pretrained('./trained_model')
tokenizer = T5Tokenizer.from_pretrained('./trained_model')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def prepare_input(input_text):
    # Tokeniser et préparer l'input pour le modèle
    inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=512, truncation=True)
    return inputs.to(device)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_text = data['text']
    prepared_input = prepare_input(input_text)
    output = model.generate(prepared_input, max_length=150, num_beams=5, early_stopping=True)
    summary = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
