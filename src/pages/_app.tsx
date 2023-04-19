//styles
import '@scss/globals.scss';

import type { AppProps } from 'next/app';

//provider
import { AppProvider } from '@providers/AppProvider';

//components
import { FloatMark } from '@components/global/FloatMark';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<Component {...pageProps} />
			<FloatMark />
		</AppProvider>
	);
}
