import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import localFont from "next/font/local"
import { Providers } from '@/redux/Providers'

const inter = localFont({
	src: [
		{
			path: "../../public/fonts/Inter/static/Inter-Regular.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "../../public/fonts/Inter/static/Inter-SemiBold.ttf",
			weight: "600",
			style: "normal"
		}
	],
	variable: "--font-inter"
})

const poppins = localFont({
	src: [
		{
			path: "../../public/fonts/Poppins/Poppins-SemiBold.ttf",
			weight: "600",
			style: "normal"
		},
		{
			path: "../../public/fonts/Poppins/Poppins-Bold.ttf",
			weight: "700",
			style: "normal"
		},
	],
	variable: "--font-poppins"
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<main className={`${inter.variable} ${poppins.variable}`}>
				<Providers>
					<Component {...pageProps} />
				</Providers>
			</main>
		</>
	)
}
