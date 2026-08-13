param (
    [string]$Project = "bijou-501014",
    [string]$Region = "europe-west2",
    [string]$ServiceName = "totalbiz-social-poster"
)

$ErrorActionPreference = "Stop"

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Deploying TotalBiz Social Poster to GCP Cloud Run..." -ForegroundColor Cyan
Write-Host "Project: $Project | Region: $Region" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan

# 1. Deploy Cloud Run Service
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptDir

gcloud run deploy $ServiceName `
  --source . `
  --project $Project `
  --region $Region `
  --platform managed `
  --allow-unauthenticated `
  --memory 512Mi `
  --timeout 300 `
  --concurrency 80 `
  --quiet


# 2. Get Service URL
$ServiceUrl = (gcloud run services describe $ServiceName --project $Project --region $Region --format="value(status.url)").Trim()
Write-Host "Cloud Run Service URL: $ServiceUrl" -ForegroundColor Green

# 3. Create or Update Cloud Scheduler Job 1: Morning LinkedIn (07:45 BST Sharp)
Write-Host "Configuring Cloud Scheduler: Morning LinkedIn (07:45 BST Sharp)..." -ForegroundColor Cyan

$MorningJob = "totalbiz-morning-linkedin"
$MorningUri = "$ServiceUrl/publish/daily-morning"

$existingMorning = gcloud scheduler jobs list --project $Project --location $Region --filter="ID:$MorningJob" --format="value(ID)"
if ($existingMorning) {
    gcloud scheduler jobs update http $MorningJob `
      --project $Project `
      --location $Region `
      --schedule "45 7 * * *" `
      --time-zone "Europe/London" `
      --uri $MorningUri `
      --http-method POST
} else {
    gcloud scheduler jobs create http $MorningJob `
      --project $Project `
      --location $Region `
      --schedule "45 7 * * *" `
      --time-zone "Europe/London" `
      --uri $MorningUri `
      --http-method POST
}

# 4. Create or Update Cloud Scheduler Job 2: Evening Meta (19:30 BST Sharp)
Write-Host "Configuring Cloud Scheduler: Evening Meta (19:30 BST Sharp)..." -ForegroundColor Cyan

$EveningJob = "totalbiz-evening-meta"
$EveningUri = "$ServiceUrl/publish/daily-evening"

$existingEvening = gcloud scheduler jobs list --project $Project --location $Region --filter="ID:$EveningJob" --format="value(ID)"
if ($existingEvening) {
    gcloud scheduler jobs update http $EveningJob `
      --project $Project `
      --location $Region `
      --schedule "30 19 * * *" `
      --time-zone "Europe/London" `
      --uri $EveningUri `
      --http-method POST
} else {
    gcloud scheduler jobs create http $EveningJob `
      --project $Project `
      --location $Region `
      --schedule "30 19 * * *" `
      --time-zone "Europe/London" `
      --uri $EveningUri `
      --http-method POST
}

Write-Host "=====================================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "Cloud Run Service: $ServiceUrl" -ForegroundColor Green
Write-Host "Morning LinkedIn Job: 07:45:00 BST Sharp ($MorningJob)" -ForegroundColor Green
Write-Host "Evening Meta Job:     19:30:00 BST Sharp ($EveningJob)" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
