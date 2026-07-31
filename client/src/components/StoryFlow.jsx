import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./BirthdayIntroScreen";
import BalloonGame from "./InteractiveBalloonCard";
import BlowCandle from "./BlowCandle";
import LoveLetter from "./LoveLetter";
import BackgroundMusic from "./BackgroundMusic";

const pageVariants = {
    initial: { opacity: 0, x: 48, scale: 0.96 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -48, scale: 0.96 },
};

const pageTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

const StoryFlow = ({
    receiverName,
    senderName,
    message,
    music,
    onFinish,
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const containerRef = useRef(null);
    const musicRef = useRef(null);

    const steps = [
        { Component: WelcomeScreen, props: { receiverName } },
        { Component: BalloonGame, props: {} },
        { Component: BlowCandle, props: { receiverName } },
        { Component: LoveLetter, props: { message, senderName } },
    ];

    const handleStepComplete = async () => {
        // Start music only once, when leaving the welcome screen.
        if (currentStep === 0) {
            await musicRef.current?.play();
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            musicRef.current?.stop();
            onFinish?.();
        }
    };

    useEffect(() => {
        containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [currentStep]);

    const { Component, props } = steps[currentStep];
    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-md mx-auto min-h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-pink-50 to-rose-100 shadow-xl shadow-rose-200/40"
        >
            {/* Background Music */}
            <BackgroundMusic
                ref={musicRef}
                src={typeof music === "string" ? music : music?.url}
            />

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentStep}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                    className="absolute inset-0 w-full h-full"
                >
                    <Component
                        {...props}
                        onComplete={handleStepComplete}
                        onNext={handleStepComplete}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StoryFlow;