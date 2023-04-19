import { useEffect, useState } from 'react';

//next
import Head from 'next/head';
import Link from 'next/link';

//styles
import styles from './index.module.scss';

//chakra
import { Skeleton } from '@chakra-ui/react';

//components
import { Header } from '@components/global/Header';
import { HomeComic } from '@components/pages/Home/HomeComic';

//tools
import { API } from '@tools/api';

interface HomeProps {
	data: IComicsResponse;
}

export default function Home(props: HomeProps) {
	const [comics, setComics] = useState<TComics>();

	useEffect(() => {
		setComics(props.data.results);
	}, [props.data]);

	return (
		<>
			<Head>
				<title>{'Home | Marvel Comics'}</title>
			</Head>
			<Header />
			<section className={styles.container}>
				<div className={styles.banner}>
					<h1>{'A SUA CENTRAL DE'}</h1>
					<h2>{'COMICS DA MARVEL'}</h2>
				</div>
				<section className={styles.content}>
					<div className={styles.slider}>
						{comics ?
							[...comics, ...comics].map((comic: IComic, index: number) => (
								<HomeComic data={comic} key={index} />
							)) :
							new Array(20).fill(0).map((_, index: number) => (
								<Skeleton
									width={'30rem'}
									height={'45rem'}
									startColor={'gray.100'}
									endColor={'gray.200'}
									borderRadius={'1rem'}
									margin={'1rem'}
									key={index}
								/>
							))
						}
					</div>
					<Link href={'/comics'} className={styles.button}>
						<p>{'VER TODOS'}</p>
					</Link>
				</section>
			</section >
			<div className={styles.background}>
				<img src={'/images/home-wallpaper.jpg'} alt={'wallpaper'} />
			</div>
		</>
	);
}

export async function getStaticProps(context: any) {
	const request = await API.get('/comics', {
		params: {
			limit: 10,
			noVariants: true,
			format: 'comic',
			dateDescriptor: 'thisMonth',
			orderBy: 'focDate',
			offset: 1
		}
	});

	const data = request.data.data;

	return {
		props: {
			data
		},
		revalidate: 60 * 60,
	};
}
