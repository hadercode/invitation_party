import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';

interface VideoInvitationProps {
    videoUrl: string;
    posterUrl?: string;
}

const VideoInvitation: React.FC<VideoInvitationProps> = ({ videoUrl, posterUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => {
                    console.error("Autoplay failed:", error);
                    setIsMuted(true);
                    videoRef.current?.play();
                });
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
            if (!newMuted && !isPlaying) {
                videoRef.current.play();
            }
        }
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if ((videoRef.current as any).webkitRequestFullscreen) {
                (videoRef.current as any).webkitRequestFullscreen();
            } else if ((videoRef.current as any).msRequestFullscreen) {
                (videoRef.current as any).msRequestFullscreen();
            }
        }
    };

    return (
        <div
            className="video-invitation-container"
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                aspectRatio: '9/16',
                background: '#000',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onClick={togglePlay}
        >
            {isLoading && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    background: 'rgba(4, 33, 17, 0.4)',
                    backdropFilter: 'blur(4px)'
                }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: 40, height: 40, border: '3px solid var(--secondary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                </div>
            )}

            <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                playsInline
                autoPlay
                muted={isMuted}
                loop
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            <AnimatePresence>
                {!isPlaying && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                background: 'var(--secondary)',
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 20px var(--bayou-glow)'
                            }}
                        >
                            <Play size={32} color="var(--primary)" fill="var(--primary)" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 3,
                    transition: 'opacity 0.3s'
                }}
            >
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                    >
                        {isPlaying ? <Pause size={20} color="white" /> : <Play size={20} color="white" fill="white" />}
                    </button>

                    <button
                        onClick={toggleMute}
                        style={{
                            background: isMuted ? 'rgba(255,255,255,0.1)' : 'var(--secondary)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: isMuted ? 'white' : 'var(--primary)',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        {isMuted ? 'Sonido' : 'On'}
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%' }}
                        title="Pantalla Completa"
                    >
                        <Maximize2 size={18} color="white" />
                    </button>
                </div>

                <div style={{ color: 'white', fontSize: '0.7rem', opacity: 0.7, letterSpacing: '1px' }}>
                    NATHALIA • MIS QUINCES
                </div>
            </motion.div>
        </div>
    );
};

export default VideoInvitation;
