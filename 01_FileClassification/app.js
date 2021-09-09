const fs = require('fs'); //node module 인지시켜줌
const path = require('path');
const os = require('os');
// 파일 종류별로 분류 

// 1. 사용자로부터 입력 폴더명 
const folder = process.argv[2];
const workingDir = path.join(os.homedir(), 'Pictures', folder);

if(!folder || fs.existsSync(workingDir)) {
    console.error('Please enter folder name in Picures');
    return;
}

const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

// 2.폴더 생성 video, captured, duplicated
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. 폴더안 파일들을 돌면서 mp4/mov , png/aae, IMG_1234( 이름에 E 가 들어있으면..)
fs.promises
    .readdir(workingDir)
    .then(processFiles)
    .catch(console.log);

// 전달, 호출 인자가 같으면 생략가능
function processFiles(files) {
    files.forEach(file => {
        if(isVideoFile(file)) {
            move(file, videoDir);
        } else if(isCapturedFile(file)) {
            move(file, capturedDir);
        } else if(isDuplicatedFile(files, file)) {
            move(file, duplicatedDir);
        }
    });
}

function isVideoFile(file) {
    const reqExp = /(mp4|mov)$/gm;
    const match = file.match(regExp);

    return !!match;
}
function isCapturedFile(file) {
    const reqExp = /(mpng|aae)$/gm;
    const match = file.match(regExp);

    return !!match;
}
function isDuplicatedFile(files, file) {
    if(!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
        return false;
    }

    const edited = `IMG_E${file.split('_')[1]}`;
    const found = files.find((f) => f.includes(edited));
    
    return !!found;
}

function move(file, targetDir) {
    console.info(`move ${file} to ${path.basename(targetDir)}`);
    const oldPath = path.join(workingDir, file);
    const newPath = path.join(targetDir, file);
    fs.promises
        .rename(oldPath, newPath)
        .catch(console.error);
}