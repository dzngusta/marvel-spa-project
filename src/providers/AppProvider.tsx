//styles
import styles from '@scss/app.module.scss';

//context

//providers
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ChakraProvider } from '@chakra-ui/react';

const theme = createTheme({
	type: 'light',
	theme: {
		colors: {
			primary: '#ef1442',
		},
	},
});

export function AppProvider({ children }: { children: React.ReactNode }) {

	return (
		<NextUIProvider disableBaseline theme={theme}>
			<ChakraProvider>
				<div className={styles.container}>
					{children}
				</div>
			</ChakraProvider>
		</NextUIProvider>
	);
}
