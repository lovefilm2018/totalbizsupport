param (
    [string]$Project = "totalbiz-marketing-automation",
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

# 3. Create or Update Cloud Scheduler Job: Lunch LinkedIn Video (12:30 BST Sharp)
Write-Host "Configuring Cloud Scheduler: Lunch LinkedIn Video (12:30 BST Sharp)..." -ForegroundColor Cyan

$LunchJob = "totalbiz-lunch-linkedin"
$LunchUri = "$ServiceUrl/publish/lunch-linkedin"

$existingLunch = gcloud scheduler jobs list --project $Project --location $Region --filter="ID:$LunchJob" --format="value(ID)"
if ($existingLunch) {
    gcloud scheduler jobs update http $LunchJob `
      --project $Project `
      --location $Region `
      --schedule "30 12 * * 1-5" `
      --time-zone "Europe/London" `
      --uri $LunchUri `
      --http-method POST
} else {
    gcloud scheduler jobs create http $LunchJob `
      --project $Project `
      --location $Region `
      --schedule "30 12 * * 1-5" `
      --time-zone "Europe/London" `
      --uri $LunchUri `
      --http-method POST
}

# 4. Create or Update Cloud Scheduler Job: Evening Meta (19:30 BST Sharp)
Write-Host "Configuring Cloud Scheduler: Evening Meta (19:30 BST Sharp)..." -ForegroundColor Cyan

$EveningJob = "totalbiz-evening-meta"
$EveningUri = "$ServiceUrl/publish/daily-evening"

$existingEvening = gcloud scheduler jobs list --project $Project --location $Region --filter="ID:$EveningJob" --format="value(ID)"
if ($existingEvening) {
    gcloud scheduler jobs update http $EveningJob `
      --project $Project `
      --location $Region `
      --schedule "30 19 * * 1-5" `
      --time-zone "Europe/London" `
      --uri $EveningUri `
      --http-method POST
} else {
    gcloud scheduler jobs create http $EveningJob `
      --project $Project `
      --location $Region `
      --schedule "30 19 * * 1-5" `
      --time-zone "Europe/London" `
      --uri $EveningUri `
      --http-method POST
}

Write-Host "=====================================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "Cloud Run Service:  $ServiceUrl" -ForegroundColor Green
Write-Host "Lunch LinkedIn Job: 12:30:00 BST Sharp ($LunchJob)" -ForegroundColor Green
Write-Host "Evening Meta Job:   19:30:00 BST Sharp ($EveningJob)" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
