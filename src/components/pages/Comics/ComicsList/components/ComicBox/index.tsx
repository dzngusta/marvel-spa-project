//styles
import styles from './index.module.scss';

interface IComicProps {
	data: IComic;
	handler?: (comic: IComic | null) => void | undefined;
}

export function ComicBox({ data, handler }: IComicProps) {

	return (
		<div className={styles.container} onClick={() => handler ? handler(data) : ''}>
			<div className={styles.thumb}>
				<img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.title} Thumbnail`} />
			</div>
			<div className={styles.infos}>
				<img src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.title} Thumbnail`} />
				<h1>{data.title}</h1>
				<h2>{(data.prices[0].price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h2>
			</div>
		</div>
	);
}
