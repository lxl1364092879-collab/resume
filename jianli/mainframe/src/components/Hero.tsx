import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const EMAIL = 'hello@mainframe.co';

const WHITE_PILLS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [pillsVisible, setPillsVisible] = useState(false);

  // Pills appear 400ms after page load, independent of the typewriter.
  useEffect(() => {
    const id = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(EMAIL);
      }
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  };

  return (
    <section className="relative z-[1] h-screen overflow-hidden flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10">
      <div className="relative z-10 max-w-xl">
        {/* Blurred intro label */}
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6 font-normal text-white blur-[4px]"
          style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.3 }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&rsquo;s Adaptive Response Interface Agent
        </p>

        {/* Typewriter text */}
        <p
          className="mb-5 sm:mb-6 font-normal text-white"
          style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, minHeight: 54 }}
        >
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-[blink_1s_step-end_infinite]" />
          )}
        </p>

        {/* Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {WHITE_PILLS.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-white hover:text-black transition-colors duration-200"
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="4" y="4" width="6.5" height="6.5" rx="1" stroke="currentColor" />
              <path d="M8 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V8" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
