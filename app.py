from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
from api.local_llm import LocalLLMClient
import os
from pathlib import Path
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
env_path = Path(__file__).parent / 'config' / '.env'
load_dotenv(env_path, override=True)  # 添加override参数
print(f"Loaded PROMPT_TEMPLATE_PATH: {os.getenv('PROMPT_TEMPLATE_PATH')}")  # 新增调试日志

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_speech():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        llm = LocalLLMClient()
        
        prompt_path = os.getenv('PROMPT_TEMPLATE_PATH')
        print(f"Prompt path: {prompt_path}")  # 调试日志
        if not prompt_path:
            return jsonify({"error": "PROMPT_TEMPLATE_PATH not configured"}), 500
        
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:  # 添加encoding参数
                prompt_template = f.read()
        except Exception as e:
            print(f"Error reading prompt file: {str(e)}")  # 调试日志
            return jsonify({"error": f"Failed to read prompt template: {str(e)}"}), 500
    except FileNotFoundError:
        return jsonify({"error": f"Prompt template not found at {prompt_path}"}), 404
    
    prompt = prompt_template.format(
        speaker=data['speaker'],
        occasion=data['occasion'],
        speech_type=data['speech_type'],
        theme=data['theme']
    )
    
    def stream():
        response = llm.generate_speech(prompt)
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content  # 直接返回chunk的内容
    
    return Response(stream(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)