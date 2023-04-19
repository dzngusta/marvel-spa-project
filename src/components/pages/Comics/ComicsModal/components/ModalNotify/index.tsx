//styles
import styles from './index.module.scss';

interface INotifyProps {
	toast: any
}

export function ModalNotify({ toast }: INotifyProps) {

	return (
		<div className={`${styles.container} ${styles[toast.status]}`}>
			{toast.title ? <h1>{toast.title}</h1> : <></>}
			{toast.description ? <p>{toast.description}</p> : <></>}
		</div>
	);
}
