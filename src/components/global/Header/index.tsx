import { useEffect, useRef, useState } from 'react';

//next
import Image from 'next/image';
import Link from 'next/link';

//styles
import styles from './index.module.scss';

//config
import { navigation } from './config';
import { useRouter } from 'next/router';

//icons
import { FaSearch } from 'react-icons/fa';

export function Header() {
	const router = useRouter();
	const [value, setValue] = useState<string>('');

	function onSearch() {
		router.push({
			pathname: '/comics',
			query: { ...router.query, search: value?.trim() }
		});
	}

	useEffect(() => {
		setValue(router.query.search ? String(router.query.search) : '');
	}, [router.query.search]);

	return (
		<header className={styles.container}>
			<img
				className={styles.logo}
				src={'/images/marvel.svg'}
				alt={'Marvel logo'}
			/>
			<nav>
				{navigation.map((item: INavigation) => (
					<Link className={router.pathname === item.path ? styles.active : ''} href={item.path} key={item.path}>{item.name}</Link>
				))}
			</nav>
			<div className={styles.input}>
				<div className={styles.icon}>
					<FaSearch size={'1.2rem'} />
				</div>
				<input
					placeholder={'Digite o quadrinho que você procura...'}
					value={value}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' ? onSearch() : ''}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				/>
				<div className={styles.button} onClick={onSearch}>
					<p>{'BUSCAR'}</p>
				</div>
			</div>
		</header>
	);
}
