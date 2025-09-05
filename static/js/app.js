document.getElementById('speechForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const output = document.getElementById('speechOutput');
    const loader = document.getElementById('loader');
    
    output.innerHTML = '';
    loader.style.display = 'block';
    
    const formData = {
        speaker: document.getElementById('speaker').value,
        occasion: document.getElementById('occasion').value,
        speech_type: document.getElementById('speech_type').value,
        theme: document.getElementById('theme').value
    };
    
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        function readStream() {
            return reader.read().then(({done, value}) => {
                if (done) {
                    // 处理最后一段内容
                    if(buffer.trim().length > 0) {
                        const p = document.createElement('p');
                        p.textContent = buffer.trim();
                        output.appendChild(p);
                    }
                    // 显示加载器
                    document.getElementById('loader').style.display = 'block';
                    
                    // 隐藏加载器 
                    document.getElementById('loader').style.display = 'none';
                    return;
                }
                
                const text = decoder.decode(value);
                buffer += text;
                
                // 检测完整段落
                const paragraphs = buffer.split('\n\n');
                buffer = paragraphs.pop() || '';
                
                paragraphs.forEach(para => {
                    if(para.trim().length > 0) {
                        const p = document.createElement('p');
                        // 替换英文标点为中文标点
                        let text = para.trim()
                            .replace(/,/g, '，')
                            .replace(/\./g, '。')
                            .replace(/!/g, '！')
                            .replace(/\?/g, '？')
                            .replace(/:/g, '：')
                            .replace(/"/g, '""');
                        p.textContent = text;
                        output.appendChild(p);
                    }
                });
                
                output.scrollTop = output.scrollHeight;
                return readStream();
            });
        }
        return readStream();
    });
});