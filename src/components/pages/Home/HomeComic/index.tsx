//styles
import styles from './index.module.scss';

export function HomeComic({ data }: { data: IComic }) {

	return (
		<div className={styles.container}>
			<img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.title} Thumbnail`} />
		</div>
	);
}
