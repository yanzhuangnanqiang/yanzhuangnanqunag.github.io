(function () {
    "use strict";

    // --- 1. 鼠标光斑 ---
    const light = document.querySelector('.mouse-light');
    document.addEventListener('mousemove', function (e) {
        light.style.transform = 'translate(calc(' + e.clientX + 'px - 50%), calc(' + e.clientY + 'px - 50%))';
    });

    // --- 2. 实时时钟 ---
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' });
        const timeEl = document.getElementById('liveTime');
        if (timeEl) timeEl.textContent = timeStr;
    }
    updateTime();
    setInterval(updateTime, 1000);

    // --- 3. 随机签名 ---
    const quotes = [
        '"慢慢来，比较快。"',
        '"代码如诗，写给自己。"',
        '"今天也是被 Rust 编译器教育的一天。"',
        '"安静地敲键盘，是成年人的冥想。"',
        '"始于书信，敬于才华。"',
        '"清风徐来，水波不兴。"'
    ];
    const quoteEl = document.getElementById('dailyQuote');
    if (quoteEl) {
        quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // --- 4. 树叶飘落动画 (Canvas) ---
    const canvas = document.getElementById('leafCanvas');
    const ctx = canvas.getContext('2d');
    const leaves = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function Leaf() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    Leaf.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = -30;
        this.size = Math.random() * 12 + 6;
        this.speedY = Math.random() * 1 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.rotate = Math.random() * Math.PI * 2;
        this.rotateSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = Math.random() * 0.5 + 0.3;
    };
    Leaf.prototype.update = function () {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 80) * 0.6;
        this.rotate += this.rotateSpeed;
        if (this.y > canvas.height + 40) this.reset();
    };
    Leaf.prototype.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(120, 170, 130, ' + this.opacity + ')';
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    for (var i = 0; i < 45; i++) {
        var leaf = new Leaf();
        leaf.y = Math.random() * canvas.height;
        leaves.push(leaf);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        leaves.forEach(function (leaf) {
            leaf.update();
            leaf.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    console.log('🍃 清风手帐 · 塞琳娜 已加载，此刻安宁。');
})();
