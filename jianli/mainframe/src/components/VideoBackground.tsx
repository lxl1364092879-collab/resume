import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

/** How much of the video's duration one full screen-width of travel scrubs. */
const SENSITIVITY = 0.8;

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React sometimes fails to apply the muted attribute via props — set it explicitly.
    video.muted = true;

    const seekToTarget = () => {
      if (isSeekingRef.current) return;
      const target = targetTimeRef.current;
      if (Math.abs(video.currentTime - target) < 0.01) return;
      isSeekingRef.current = true;
      video.currentTime = target;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }
      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      const next = Math.max(0, Math.min(duration, targetTimeRef.current + offset));
      targetTimeRef.current = next;
      seekToTarget();
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // If the target moved while the previous seek was in flight, queue the next one.
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        seekToTarget();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 w-full h-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
