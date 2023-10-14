import AppLayout from "@/components/AppLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from 'next-i18next'
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<AppLayout>
			<>
				<Component {...pageProps} />
				<ToastContainer />
			</>
		</AppLayout>
	);
}

export default appWithTranslation(App)
