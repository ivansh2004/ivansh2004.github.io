// 音乐文件列表
let musicFiles = [];
let currentSong = null;

// 获取音乐文件列表
async function getMusicFiles() {
    try {
        const response = await fetch('/Music/');
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const links = doc.getElementsByTagName('a');
        
        musicFiles = Array.from(links)
            .map(link => link.href)
            .filter(href => href.toLowerCase().endsWith('.mp3'))
            .map(href => href.split('/').pop());
    } catch (error) {
        console.error('获取音乐文件列表失败:', error);
    }
}

// 获取随机歌曲
function getRandomSong() {
    if (musicFiles.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    return musicFiles[randomIndex];
}

// 播放随机歌曲
async function playRandomSong() {
    if (musicFiles.length === 0) {
        await getMusicFiles();
    }
    
    const song = getRandomSong();
    if (song) {
        currentSong = song;
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = `Music/${song}`;
        audioPlayer.play();
        document.getElementById('currentSong').textContent = `正在播放: ${song}`;
    }
}

// 播放下一首
function nextSong() {
    playRandomSong();
}

// 页面加载时获取音乐文件列表
window.addEventListener('load', getMusicFiles); 