@echo off
chcp 65001 > nul
title Antigravity IDE - TotalBiz Support (Lead Digital Marketing & Dev)

set PROMPT_ORIGIN=IDE
set GEMINI_API_KEY=

cd /d "%~dp0"

echo --------------------------------------------------
echo [Git Sync] Syncing latest changes with GitHub...
if exist ".git" (
    git pull --rebase --autostash 2>nul
)

if not exist "C:\Users\TotalBiz\Documents\AI_Usage_Audit" mkdir "C:\Users\TotalBiz\Documents\AI_Usage_Audit"

if exist "C:\Users\TotalBiz\Documents\AI_Usage_Audit\log_session_start.ps1" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\TotalBiz\Documents\AI_Usage_Audit\log_session_start.ps1" -ProjectName "TotalBizSupport"
)

echo.
echo [Antigravity IDE] Launching Workspace...
echo [Active Project] TotalBiz Support (totalbiz.co.uk & Lead Digital Marketing)
echo [Global Audit]   C:\Users\TotalBiz\Documents\AI_Usage_Audit\global_usage_audit.csv
echo --------------------------------------------------
echo.

start "" "C:\Users\TotalBiz\AppData\Local\Programs\Antigravity IDE\Antigravity IDE.exe" "C:\Users\TotalBiz\Documents\totalbizsupport"
