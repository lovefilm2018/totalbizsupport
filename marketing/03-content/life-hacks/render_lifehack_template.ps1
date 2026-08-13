param (
    [Parameter(Mandatory=$true)]
    [string]$TutorialVideo,

    [string]$OutputVideo = ""
)

$ErrorActionPreference = "Stop"

$TemplateDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$FFmpegBin = "C:\Users\TotalBiz\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build\bin\ffmpeg.exe"

if (-not $OutputVideo) {
    $OutputVideo = Join-Path $TemplateDir "output\totalbiz_ai_life_hack.mp4"
}

$OutputDir = Split-Path -Parent $OutputVideo
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$FilterScriptPath = Join-Path $TemplateDir "render\lifehack_filter_template.txt"
$PhonePlate = Join-Path $TemplateDir "assets\phone_in_hand_green_screen.png"
$Portrait = Join-Path $TemplateDir "assets\presenter_portrait.png"
$Logo = Join-Path $TemplateDir "assets\totalbiz_logo_blue_white_final.png"

# Read filter script and adapt font paths for Windows FFmpeg syntax (C\: Windows escaping)
$FilterContent = Get-Content -Path $FilterScriptPath -Raw
$FilterContent = $FilterContent -replace "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "C\\:/Windows/Fonts/arialbd.ttf"
$FilterContent = $FilterContent -replace "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "C\\:/Windows/Fonts/arial.ttf"

Write-Host "Rendering AI Life Hack video..." -ForegroundColor Cyan
Write-Host "Input Video: $TutorialVideo"
Write-Host "Output Target: $OutputVideo"

& $FFmpegBin -y `
  -i "$TutorialVideo" `
  -loop 1 -i "$PhonePlate" `
  -loop 1 -i "$Portrait" `
  -loop 1 -i "$Logo" `
  -filter_complex "$FilterContent" `
  -map "[final]" -map "0:a?" `
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p `
  -c:a aac -b:a 160k -shortest -movflags +faststart `
  "$OutputVideo"

Write-Host "Render Complete! File saved to: $OutputVideo" -ForegroundColor Green
