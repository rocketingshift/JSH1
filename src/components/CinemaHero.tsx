import { useEffect, useRef, useState, useCallback } from "react";
import Player from "@vimeo/player";
import {
  Volume2,
  VolumeX,
  Share2,
  Maximize2,
  ChevronDown,
  RotateCcw,
  Play,
  Check,
} from "lucide-react";

// Video configuration
export const VIMEO_VIDEO_ID = "1234759571";
export const VIMEO_VIDEO_HASH = "d2a8dad1bb";
export const YOUTUBE_VIDEO_ID = "9QSc5Nl-f6g"; // AI 2027 / AGI Cinematic documentary film
// Poster thumbnail shown until the Vimeo background finishes loading (avoids a black void)
export const HERO_POSTER =
  "https://vibe.filesafe.space/1791701521870138312/assets/335a8278-c42e-4d17-a1e0-3122faa80a67.png";

interface CinemaHeroProps {
  onScrollToTimeline?: () => void;
  vimeoVideoId?: string;
  vimeoHash?: string;
  youtubeVideoId?: string;
}

export function CinemaHero({
  onScrollToTimeline,
  vimeoVideoId = VIMEO_VIDEO_ID,
  vimeoHash = VIMEO_VIDEO_HASH,
  youtubeVideoId = YOUTUBE_VIDEO_ID,
}: CinemaHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const vimeoIframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  // Mirror of isPlayingFull read inside long-lived Vimeo callbacks (init runs once)
  const isPlayingFullRef = useRef(false);

  // Core dual-mode states
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVimeoReady, setIsVimeoReady] = useState(false);

  // Auto-hide controls timer
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    // Auto-hide after 3.5s of inactivity when in full playback mode
    if (isPlayingFull) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  }, [isPlayingFull]);

  // Handle mouse/touch movement to reveal controls
  const handleUserActivity = useCallback(() => {
    resetControlsTimer();
  }, [resetControlsTimer]);

  // 1. Initialize Vimeo Player — runs ONCE ([]) so the player is never
  //    destroyed & recreated when toggling modes. State is read via the ref below.
  useEffect(() => {
    const iframe = vimeoIframeRef.current;
    if (!iframe) return;

    try {
      const player = new Player(iframe);
      playerRef.current = player;

      player
        .ready()
        .then(() => {
          setIsVimeoReady(true);
          // Ensure initial mute
          player.setVolume(0).catch(() => {});
        })
        .catch((err) => {
          console.warn("Vimeo ready error:", err);
        });

      // Loop first 30 seconds preview if not in full movie mode
      const handleTimeUpdate = (data: { seconds: number }) => {
        if (!isPlayingFullRef.current && data.seconds >= 30) {
          player.setCurrentTime(0).catch(() => {});
        }
      };

      // Loop on ended
      const handleEnded = () => {
        if (!isPlayingFullRef.current) {
          player.setCurrentTime(0).catch(() => {});
          player.play().catch(() => {});
        }
      };

      player.on("timeupdate", handleTimeUpdate);
      player.on("ended", handleEnded);

      return () => {
        try {
          player.off("timeupdate", handleTimeUpdate);
          player.off("ended", handleEnded);
          player.destroy();
        } catch {
          // ignore cleanup errors
        }
      };
    } catch (e) {
      console.warn("Error creating Vimeo player instance:", e);
    }
  }, []);

  // Keep the ref in sync with state so the one-time callbacks read the latest value
  useEffect(() => {
    isPlayingFullRef.current = isPlayingFull;
  }, [isPlayingFull]);

  // 2. React to mode changes (Preview <-> Full Movie)
  useEffect(() => {
    const player = playerRef.current;

    if (isPlayingFull) {
      // Pause Vimeo background to save resources & prevent audio leak
      if (player) {
        player.pause().catch(() => {});
      }
      setShowYouTube(true);
      resetControlsTimer();
    } else {
      // Exiting full mode: restore Vimeo preview background
      setShowYouTube(false);
      setShowControls(true);
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
      if (player) {
        player.setCurrentTime(0).catch(() => {});
        player.setVolume(0).catch(() => {});
        setIsMuted(true);
        player.play().catch(() => {});
      }
    }
  }, [isPlayingFull, resetControlsTimer]);

  // Toggle Vimeo mute
  const toggleMute = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (isMuted) {
        await player.setVolume(1);
        setIsMuted(false);
      } else {
        await player.setVolume(0);
        setIsMuted(true);
      }
    } catch (err) {
      console.warn("Error toggling volume:", err);
    }
  };

  // Toggle fullscreen on root section
  const toggleFullscreen = () => {
    if (!sectionRef.current) return;
    if (!document.fullscreenElement) {
      sectionRef.current.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Share link
  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="cinema-hero-root"
      ref={sectionRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className="relative w-full h-[100svh] min-h-[600px] max-h-[1080px] bg-black overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. BACKGROUND VIDEO LAYER (Vimeo Preview)
          - scale-[1.35] on mobile -> scale-[1.12] on desktop to cover edges
          - pointer-events-none so it doesn't trap clicks
          - opacity-0 and hidden when isPlayingFull (to give 100% control to YouTube)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        {/* Poster thumbnail — fades out once the Vimeo background is ready,
            preventing a black void on slow connections. Hidden during full movie. */}
        {!isPlayingFull && (
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover scale-[1.12] origin-center transition-opacity duration-700 pointer-events-none ${
              isVimeoReady ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
            isPlayingFull ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <iframe
            ref={vimeoIframeRef}
            src={`https://player.vimeo.com/video/${vimeoVideoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}autoplay=1&muted=1&loop=0&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1&background=1`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            className={`w-full h-full pointer-events-none scale-[1.35] sm:scale-[1.2] md:scale-[1.12] origin-center object-cover border-0 transition-opacity duration-700 ${
              isVimeoReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            title="Mật Mã Jensen Huang Cinematic Background"
          />
        </div>

        {/* Cinematic overlays (radial vignette + vertical gradient fades) - hidden during full movie */}
        {!isPlayingFull && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/20 to-black/85" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FULL-SCREEN MOVIE LAYER (YouTube Native Player)
          - Rendered when showYouTube === true
          - pointer-events-auto so YouTube gestures, seek bar, fullscreen & mobile landscape work natively
         ───────────────────────────────────────────────────────────── */}
      {showYouTube && (
        <div className="absolute inset-0 z-10 w-full h-full bg-black animate-in fade-in duration-500">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&fs=1`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope"
            allowFullScreen
            className="w-full h-full border-0 pointer-events-auto"
            title="Mật Mã Jensen Huang Full Cinematic Film"
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. HEADER / TOP BAR
          - Left: AI 2027 Badge (pulsing jade dot + gold mono text)
                  + "Quay lại" (RotateCcw) button when isPlayingFull
          - Right: Mute toggle, Share, Fullscreen buttons (only in preview)
         ───────────────────────────────────────────────────────────── */}
      <header
        className={`relative z-20 flex items-center justify-between gap-2 px-4 sm:px-10 lg:px-14 safe-top sm:pt-6 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Left column */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/30 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00d296] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-[#d4af37] uppercase">
              Mật Mã Jensen Huang
            </span>
          </div>

          {/* When in Full Movie mode, show Back / Minimize button */}
          {isPlayingFull && (
            <button
              onClick={() => setIsPlayingFull(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#d4af37]/60 text-[#f3e5ab] hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
              title="Thu nhỏ / Quay lại chế độ xem thử"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">
                Quay lại
              </span>
            </button>
          )}
        </div>

        {/* Right column (only shown in preview mode to leave 100% space to YouTube controls in full mode) */}
        {!isPlayingFull && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-medium border transition-all cursor-pointer ${
                isMuted
                  ? "bg-black/50 border-white/20 text-white/80 hover:text-white hover:border-[#d4af37]/50"
                  : "bg-[#d4af37]/20 border-[#d4af37] text-[#f3e5ab] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              }`}
              title={isMuted ? "Bật âm thanh nền" : "Tắt âm thanh nền"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono text-[11px]">Bật tiếng</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#d4af37]" />
                  <span className="hidden sm:inline font-mono text-[11px] text-[#f3e5ab]">
                    Đang phát
                  </span>
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
              title="Chia sẻ liên kết"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#00d296]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
              title="Toàn màn hình"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          4. CENTER CTA: "XEM PHIM" Sandstone Gold Bar Button
          - Only visible in preview mode (!isPlayingFull)
          - Radial spinning aura background (gold + jade glow)
          - Dual ring: solid border-gold/40 + dashed spinning border-gold/60
          - Sandstone gold bar gradient body
         ───────────────────────────────────────────────────────────── */}
      {!isPlayingFull && (
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="flex flex-col items-center gap-6 pointer-events-auto animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() => setIsPlayingFull(true)}
              className="group relative flex items-center justify-center focus:outline-none cursor-pointer"
              aria-label="Xem toàn bộ phim điện ảnh Mật Mã Jensen Huang"
            >
              {/* Radial aura rotating / pulsing glow */}
              <div className="absolute -inset-6 rounded-full bg-radial-[circle] from-[#d4af37]/35 via-[#00d296]/20 to-transparent blur-xl group-hover:scale-125 transition-transform duration-700 opacity-80" />

              {/* Outer static ring */}
              <div className="absolute -inset-3 rounded-full border border-[#d4af37]/40 scale-95 group-hover:scale-110 transition-transform duration-500" />

              {/* Dashed spinning ring */}
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#d4af37]/60 animate-[spin_30s_linear_infinite]" />

              {/* Gold Ingot Button Body */}
              <div className="relative flex items-center gap-2.5 sm:gap-3.5 px-6 sm:px-11 py-3 sm:py-4.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] text-[#12110d] font-display font-black text-xs sm:text-base tracking-[0.18em] sm:tracking-[0.22em] uppercase shadow-[0_0_35px_rgba(212,175,55,0.65),inset_0_1px_2px_rgba(255,255,255,0.8)] border border-[#ffe082] group-hover:shadow-[0_0_55px_rgba(212,175,55,0.95)] group-hover:scale-105 active:scale-95 transition-all duration-300">
                {/* Circular dark inner badge with play icon */}
                <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1c1917] text-[#d4af37] border border-[#d4af37]/60 shadow-inner">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-[#d4af37] text-[#d4af37] ml-0.5" />
                </span>
                <span className="drop-shadow-xs select-none">XEM PHIM</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. FOOTER: Scroll Down Button ("Khám phá sự kiện thật")
          - Only visible in preview mode (!isPlayingFull)
         ───────────────────────────────────────────────────────────── */}
      {!isPlayingFull && (
        <footer className="relative z-30 flex flex-col items-center justify-center safe-bottom sm:pb-8 px-4 transition-opacity duration-500 opacity-100">
          <button
            onClick={() => {
              if (onScrollToTimeline) {
                onScrollToTimeline();
              } else {
                const target =
                  document.getElementById("timeline-section") ||
                  document.getElementById("forecast-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
                }
              }
            }}
            className="group flex flex-col items-center gap-1.5 text-white/75 hover:text-[#d4af37] transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]/90 group-hover:text-[#d4af37] transition-colors">
              Cuộn để giải mã
            </span>
            <div className="flex items-center justify-center w-7 h-7 rounded-full border border-[#d4af37]/30 bg-black/40 backdrop-blur-sm group-hover:border-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37]/10 transition-all">
              <ChevronDown className="w-4 h-4 text-[#d4af37] animate-bounce" />
            </div>
          </button>
        </footer>
      )}
    </section>
  );
}
