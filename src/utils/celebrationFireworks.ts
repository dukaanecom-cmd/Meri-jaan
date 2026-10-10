import confetti from 'canvas-confetti';

/**
 * Grand Birthday Fireworks & Patakhe Celebration Engine
 * Creates realistic, festive fireworks and cracker bursts across the screen
 * whenever the website is opened after 12:00 AM midnight on 11 October.
 */
export function launchGrandBirthdayFireworks() {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Colors: Rose Gold, Champagne, Ruby Red, Soft Pink, Golden Yellow
  const colors = ['#F43F5E', '#FB7185', '#F59E0B', '#FBBF24', '#BE185D', '#FDA4AF', '#FFFFFF'];

  // 1. Initial Grand Cannon Blast from Left & Right
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 65,
    origin: { x: 0, y: 0.65 },
    colors,
  });
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 65,
    origin: { x: 1, y: 0.65 },
    colors,
  });

  // 2. High-Altitude Rocket Fireworks Explosions across the sky
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 45;

    // Random sky coordinates
    const randomX = Math.random() * 0.8 + 0.1; // 10% to 90%
    const randomY = Math.random() * 0.4 + 0.1; // 10% to 50% high in the sky

    confetti({
      particleCount,
      startVelocity: 35,
      spread: 360,
      ticks: 80,
      origin: { x: randomX, y: randomY },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });

    // Secondary baby sparkles for cracker explosion feel
    confetti({
      particleCount: 20,
      startVelocity: 20,
      spread: 120,
      ticks: 60,
      origin: { x: randomX, y: randomY },
      colors: ['#FFE066', '#FFFFFF', '#F43F5E'],
    });
  }, 380);

  // 3. Climax Finale Shower at 2.5 seconds
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 160,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#F43F5E', '#BE185D', '#FB7185'],
    });
  }, 2200);
}

/**
 * Checks if the current time has passed 12:00 AM on 11 October (Midnight)
 * Date of Birth: 11 October 2008 (18th Birthday: 11 October 2026 00:00:00)
 */
export function isBirthdayMidnightPassed(birthDateString = '2008-10-11'): boolean {
  const now = new Date();
  const currentYear = now.getFullYear();

  // Target: 11 October at 00:00:00 (Midnight)
  const targetMidnight = new Date(currentYear, 9, 11, 0, 0, 0, 0); // month 9 = October

  return now.getTime() >= targetMidnight.getTime();
}
