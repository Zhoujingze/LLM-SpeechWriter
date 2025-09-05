# LLM-SpeechWriter
这是一个用于自动生成演讲稿的 Web 应用。用户可以通过网页界面输入需求，系统会调用本地大语言模型（LLM）生成符合要求的演讲稿，并展示在页面上。

## 项目简介
LLM-SpeechWriter 是一个用于自动生成演讲稿的 Web 应用，支持本地大语言模型推理。项目结构清晰，包含前后端、静态资源、模板和配置等模块。

## 目录结构说明
```
speechwriter/
├── app.py                # 主应用入口，Flask Web 服务
├── config/
│   └── .env              # 环境变量配置文件
├── data/
│   ├── prompts/
│   │   └── speech_prompt.txt  # 演讲稿提示词模板
├── static/
│   ├── css/
│   │   └── style.css     # 前端样式文件
│   ├── images/
│   │   └── bg-pattern.mp4# 背景视频/图片
│   └── js/
│       └── app.js        # 前端交互脚本
├── templates/
│   └── index.html        # 主页面模板
```

## 技术栈说明
- **后端框架**：Flask
- **前端**：HTML、CSS、JavaScript
- **本地推理**：Python 封装本地大语言模型（如 Llama、ChatGLM 等）
- **配置管理**：.env 环境变量文件

## 安装与运行
1. 安装依赖：
   ```powershell
   pip install flask
   # 如需本地大模型推理，安装相关依赖
   pip install transformers
   ```
2. 配置环境变量：
   编辑 `config/.env` 文件，设置模型路径、端口等参数。
3. 启动服务：
   ```powershell
   python app.py
   ```
4. 访问页面：
   在浏览器中打开 `http://localhost:5000`

## 主要功能说明
- **首页展示**：通过 `templates/index.html` 渲染主页面，用户可输入需求生成演讲稿。
- **演讲稿生成**：调用本地大模型，根据 `data/prompts/speech_prompt.txt` 模板和用户输入生成演讲稿。
- **静态资源**：前端样式、脚本和图片/视频均存放于 `static/` 目录。

## 页面展示

<img width="1909" height="920" alt="image" src="https://github.com/user-attachments/assets/42828c30-3ff0-4f1d-a4bf-b9de6a85eafc" />

## 二次开发建议
- 可扩展支持更多模型或云端推理。
- 增加用户管理、历史记录等功能。
- 优化前端交互体验。

## 维护与支持
如需技术支持或反馈建议，请联系作者。



