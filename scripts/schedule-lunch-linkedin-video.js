import { executeVideoPublish } from './post-linkedin-video-hack1.js';

function getTargetTime() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(12, 30, 0, 0); // 12:30 PM BST (local time)
  return target;
}

function startScheduler() {
  const now = new Date();
  const target = getTargetTime();
  let msUntilTarget = target.getTime() - now.getTime();

  if (msUntilTarget <= 0) {
    console.log('[Scheduler] Target 12:30 PM has already passed or is right now! Executing video publish immediately...');
    executeVideoPublish();
    return;
  }

  const minutesUntil = Math.round(msUntilTarget / 60000);
  console.log(`[Scheduler] Video dispatch locked for 12:30 PM BST.`);
  console.log(`[Scheduler] Current time: ${now.toLocaleTimeString()} | Target: 12:30:00 PM | (~${minutesUntil} minutes remaining)`);

  setTimeout(async () => {
    console.log(`\n⏰ [12:30 PM LUNCH TRIGGER FIRED] Executing LinkedIn Video Publish Pipeline...`);
    try {
      await executeVideoPublish();
      console.log(`🎉 [SUCCESS] AI Life Hack #1 Video is now LIVE on LinkedIn!`);
      process.exit(0);
    } catch (err) {
      console.error(`❌ [ERROR] Video publish failed:`, err);
      process.exit(1);
    }
  }, msUntilTarget);
}

startScheduler();
