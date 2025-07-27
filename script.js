// iOS Animation Performance Test JavaScript

// グローバル変数
let performanceData = {
    mp4: {},
    webp: {},
    avif: {}
};

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeDeviceInfo();
    initializePerformanceTests();
    checkFormatSupport();
});

// デバイス情報の取得と表示
function initializeDeviceInfo() {
    document.getElementById('user-agent').textContent = navigator.userAgent;
    document.getElementById('screen-size').textContent = `${screen.width} × ${screen.height}`;
    document.getElementById('device-pixel-ratio').textContent = window.devicePixelRatio || 1;
}

// パフォーマンステストの初期化
function initializePerformanceTests() {
    // MP4のテスト
    const mp4Video = document.getElementById('mp4-video');
    const mp4StartTime = performance.now();
    
    mp4Video.addEventListener('loadstart', function() {
        console.log('MP4 loading started');
    });
    
    mp4Video.addEventListener('loadedmetadata', function() {
        const loadTime = performance.now() - mp4StartTime;
        performanceData.mp4.loadTime = loadTime;
        document.getElementById('mp4-load-time').textContent = `${loadTime.toFixed(2)}ms`;
        
        // ビデオのフレームレート情報を取得（可能な場合）
        if (mp4Video.videoWidth && mp4Video.videoHeight) {
            document.getElementById('mp4-fps').textContent = 'データなし（ブラウザ制限）';
        }
    });
    
    mp4Video.addEventListener('error', function(e) {
        console.error('MP4 loading error:', e);
        document.getElementById('mp4-load-time').textContent = 'エラー';
    });
    
    // WebPのテスト
    const webpImage = document.getElementById('webp-image');
    const webpStartTime = performance.now();
    
    webpImage.addEventListener('load', function() {
        const loadTime = performance.now() - webpStartTime;
        performanceData.webp.loadTime = loadTime;
        document.getElementById('webp-load-time').textContent = `${loadTime.toFixed(2)}ms`;
    });
    
    webpImage.addEventListener('error', function() {
        console.log('WebP loading error');
    });
    
    // AVIFのテスト
    const avifImage = document.getElementById('avif-image');
    
    avifImage.addEventListener('load', function() {
        console.log('AVIF loaded successfully');
    });
    
    avifImage.addEventListener('error', function() {
        console.log('AVIF loading error - possibly not supported');
    });
    
    // ファイルサイズの取得
    getFileSize('assets/mp4.mp4', 'mp4');
    getFileSize('assets/webp.webp', 'webp');
}

// ファイルサイズの取得
async function getFileSize(url, format) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        
        if (contentLength) {
            const sizeInBytes = parseInt(contentLength);
            const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
            
            performanceData[format].fileSize = sizeInBytes;
            document.getElementById(`${format}-size`).textContent = `${sizeInMB} MB`;
        } else {
            // フォールバック: 実際にダウンロードしてサイズを測定
            const fullResponse = await fetch(url);
            const blob = await fullResponse.blob();
            const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
            
            performanceData[format].fileSize = blob.size;
            document.getElementById(`${format}-size`).textContent = `${sizeInMB} MB`;
        }
    } catch (error) {
        console.error(`Error getting file size for ${format}:`, error);
        document.getElementById(`${format}-size`).textContent = '取得エラー';
    }
}

// フォーマット対応状況の確認
function checkFormatSupport() {
    // WebP対応の確認
    const webpSupport = checkWebPSupport();
    webpSupport.then(supported => {
        const supportText = supported ? '✅ 対応' : '❌ 非対応';
        
        document.getElementById('webp-support').textContent = supportText;
        
        if (!supported) {
            document.getElementById('webp-support').classList.add('error');
        } else {
            document.getElementById('webp-support').classList.add('success');
        }
    });
}

// WebP対応確認関数
function checkWebPSupport() {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// ビデオ制御関数
function playVideo(videoId) {
    const video = document.getElementById(videoId);
    video.play().catch(e => {
        console.error('Video play error:', e);
    });
}

function pauseVideo(videoId) {
    const video = document.getElementById(videoId);
    video.pause();
}

function resetVideo(videoId) {
    const video = document.getElementById(videoId);
    video.currentTime = 0;
    video.pause();
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
});

// デバッグ情報の出力
console.log('iOS Animation Performance Test loaded');
console.log('User Agent:', navigator.userAgent);

const images = ['assets/1.webp', 'assets/2.webp', 'assets/3.webp'];
let currentImageIndex = 0;
const mediaContainer = document.createElement('div');
mediaContainer.classList.add('media-container');
const img = document.createElement('img');
img.id = 'webp-image';
img.src = images[currentImageIndex];
img.alt = 'Animated WebP';
img.loading = 'lazy';
const p = document.createElement('p');
p.textContent = '確認観点: 表示されているか & カクカクしていないか';
mediaContainer.appendChild(img);
mediaContainer.appendChild(p);
document.querySelector('.test-section').appendChild(mediaContainer);

function updateImage() {
    img.src = images[currentImageIndex];
}

document.getElementById('next-button').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
});

document.getElementById('prev-button').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
});
