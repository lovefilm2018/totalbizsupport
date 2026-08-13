import { execSync } from 'child_process';
import path from 'path';

const ffmpegPath = 'C:\\Users\\TotalBiz\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.exe';
const inputCrop = path.resolve('marketing/03-content/brand-assets/logo-landscape-crop.PNG');
const outputCrop = path.resolve('marketing/03-content/brand-assets/logo_landscape_transparent.png');

console.log('Processing landscape cropped logo...');

// Make white transparent with precise colorkey and curve boost
const cmd = `"${ffmpegPath}" -y -i "${inputCrop}" -vf "colorkey=0xFFFFFF:0.15:0.02" -update 1 -frames:v 1 -pix_fmt rgba "${outputCrop}"`;

execSync(cmd, { stdio: 'inherit' });
console.log('Processed logo saved to:', outputCrop);
