//styles
import styles from './index.module.scss';

//context
import { useComics } from '@pages/comics';

//chakra
import { Grid, GridItem, Skeleton } from '@chakra-ui/react';

//components
import { ComicBox } from './components/ComicBox';

export function ComicsList() {
	const { comics, onSelect } = useComics();

	return (
		<div className={styles.container}>
			<Grid
				className={styles.list}
				templateColumns={'repeat(auto-fit, 20rem)'}
				gridGap={'2rem'}
			>
				{comics ?
					comics.map((comic: IComic, index: number) => (
						<GridItem key={comic.id}>
							<ComicBox data={comic} handler={onSelect} />
						</GridItem>
					)) :
					new Array(18).fill(0).map((_, index: number) => (
						<GridItem key={index}>
							<Skeleton
								width={'100%'}
								height={'30rem'}
								startColor={'gray.100'}
								endColor={'gray.200'}
								borderRadius={'1rem'}
								key={index}
							/>
						</GridItem>
					))
				}
			</Grid>
		</div>
	);
}
