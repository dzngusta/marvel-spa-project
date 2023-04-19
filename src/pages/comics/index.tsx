import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

//next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

//context
interface IContext {
	comics?: TComics,
	onPagination?: (e: number) => void,
	selected?: IComic | null;
	onSelect?: (comic: IComic | null) => void;
	page?: { current: number, total: number }
}

//context
const ComicsContext = createContext<IContext>({});

//styles
import styles from './index.module.scss';

//libs
import { Pagination } from '@nextui-org/react';

//components
import { Header } from '@components/global/Header';
import { Footer } from '@components/global/Footer';
import { ComicsList } from '@components/pages/Comics/ComicsList';

//tools
import { API } from '@tools/api';
import { ComicsModal } from '@components/pages/Comics/ComicsModal';

interface ComicsProps {
	page: {
		current: number;
		total: number;
	};
	comics: TComics;
	onSelect: (comic: IComic | null) => void;
}

export default function Comics(props: ComicsProps) {
	const router = useRouter();

	const [comics, setComics] = useState<TComics>();
	const [filteredComics, setFilteredComics] = useState(comics);
	const [page, setPage] = useState(props.page);

	const [selectedComic, setSelectedComic] = useState<IComic | null>();

	useEffect(() => {
		setComics(props.comics);
		setFilteredComics(props.comics);
		setPage(props.page);
	}, [props]);

	function onPagination(page: number) {
		router.push({
			pathname: '/comics',
			query: { page: page },
		});
	}

	function onSelect(comic: IComic | null) {
		setSelectedComic(comic);
	}

	const values = {
		comics: filteredComics,
		onPagination,
		selected: selectedComic,
		onSelect,
		page
	};

	return (
		<ComicsContext.Provider value={values}>
			<Head>
				<title>{'Comics | Marvel Comics'}</title>
			</Head>
			<Header />
			<section className={styles.container}>
				<ComicsList />
			</section>
			<ComicsModal />
			<Pagination
				total={page?.total}
				initialPage={1}
				page={page?.current}
				animated={false}
				css={{ margin: '2rem 0 5rem', zIndex: 1 }}
				size={'xl'}
				noMargin
				onChange={onPagination}
			/>
			<Footer />
		</ComicsContext.Provider>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query } = context;

	const page = Number(query.page) || 1;
	const pageLimit = 40;

	const search = query.search || '';

	const request = await API.get('/comics', {
		params: {
			limit: pageLimit,
			noVariants: true,
			format: 'comic',
			dateRange: '2022-01-01,2023-01-01',
			orderBy: '-focDate',
			offset: page > 1 ? pageLimit * (page - 1) : 0
		}
	});

	const data = request.data.data;
	let comics = data.results;

	const pageAmount = Math.ceil(data.total / pageLimit);

	if (search) {
		comics = comics.filter((comic: IComic) => comic.title.toLowerCase().includes(String(search).toLowerCase()));
	}

	return {
		props: {
			comics,
			page: {
				current: page,
				total: pageAmount
			},
		},
	};
}

export const useComics = () => useContext(ComicsContext);
