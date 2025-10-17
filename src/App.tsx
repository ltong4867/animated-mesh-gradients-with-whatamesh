import { useEffect, useState } from "react";
import { Gradient } from "./assets/gradient";

export default () => {
	const targetTimestamp = 1760727900; // Oct 17, 2025 19:05:00 UTC
	const [currentTime, setCurrentTime] = useState(new Date());
	const [countdown, setCountdown] = useState("");

	useEffect(() => {
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);
			
			const targetDate = new Date(targetTimestamp * 1000);
			const diff = Math.floor((targetDate.getTime() - now.getTime()) / 1000);
			
			if (diff > 0) {
				const days = Math.floor(diff / 86400);
				const hours = Math.floor((diff % 86400) / 3600);
				const minutes = Math.floor((diff % 3600) / 60);
				const seconds = diff % 60;
				setCountdown(`T-${days}d ${hours}h ${minutes}m ${seconds}s`);
			} else {
				setCountdown("T-0d 0h 0m 0s");
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatMilitaryTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<main className="min-h-screen flex flex-col relative bg-slate-900">
			<div className="relative z-10 flex flex-col flex-1 justify-center items-center p-10">
				<h1 className="text-7xl font-bold text-white text-center mb-8">
					Woah, look at this whatamesh gradient.
				</h1>
				<div className="bg-gray-800 border-4 border-gray-600 p-8 shadow-2xl">
					<div className="font-mono text-6xl font-bold text-white tracking-widest">
						{formatMilitaryTime(currentTime)}
					</div>
				</div>
				<div className="mt-8 text-5xl font-bold text-red-900">
					{countdown}
				</div>
			</div>
			<canvas
				id="gradient-canvas"
				className="fixed inset-0"
				data-transition-in
			/>
		</main>
	);
};
