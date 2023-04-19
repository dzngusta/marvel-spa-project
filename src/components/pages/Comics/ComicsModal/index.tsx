import { useState } from 'react';

//styles
import styles from './index.module.scss';

//icons
import { IoClose } from 'react-icons/io5';
import { IoMdCart } from 'react-icons/io';

//context
import { useComics } from '@pages/comics';

//animxyz
import '@animxyz/core';
import { XyzTransition } from '@animxyz/react';

//chakra
import { useToast } from '@chakra-ui/react';

//components
import { ModalMap } from './components/ModalMap';
import { ModalNotify } from './components/ModalNotify';

export function ComicsModal() {
	const toast = useToast();
	const { selected, onSelect } = useComics();
	const [shipTo, setShipTo] = useState<IShipTo | null>();

	function handleShip(address: IShipTo | null) {
		setShipTo(address);
		if (address) {
			toast({
				title: 'Endereço de entrega selecionado',
				status: 'success',
				position: 'top-right',
				description: address?.address,
				duration: 3000,
				render: (props) => (<ModalNotify toast={props} />)
			});
		}
	}

	function onBuy() {
		if (!shipTo) {
			toast({
				description: 'Selecione o endereço de entrega',
				status: 'error',
				position: 'top-right',
				duration: 3000,
				render: (props) => (<ModalNotify toast={props} />)
			});
			return;
		} else {
			toast.closeAll();
			toast({
				title: 'Compra concluída',
				status: 'success',
				position: 'top-right',
				description: 'Obrigado pela sua compra, seu produto chegará em 3 dias.',
				duration: 3000,
				render: (props) => (<ModalNotify toast={props} />)
			});
			onSelect!(null);
			return;
		}
	}

	return (
		<XyzTransition appear xyz={'fade duration-2'}>
			{selected &&
				<div className={styles.container}>
					<div className={styles.content}>
						<div className={styles.comic}>
							<div className={styles.thumb}>
								<img src={`${selected.thumbnail.path}.${selected.thumbnail.extension}`} alt={`${selected.title} Thumbnail`} />
							</div>
							<div className={styles.infos}>
								<div className={styles.box}>
									<h1>{selected.title}</h1>
									<h3>{'#'}{selected.digitalId}</h3>
								</div>
								<div className={styles.box}>
									<label>{'Endereço de entrega'}</label>
									<p>{!shipTo ? 'Selecione o endereço no mapa' : shipTo.address}</p>
								</div>
								<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
									<div className={styles.box}>
										<label>{'Preço'}</label>
										<h2>{(selected.prices[0].price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h2>
									</div>
									<button className={styles.buy} onClick={onBuy}>
										<IoMdCart size={'1.6rem'} />
										<span>{'COMPRAR'}</span>
									</button>
								</div>
							</div>
						</div>
						<div className={styles.map}>
							<ModalMap handler={{ handleShip }} />
						</div>
						<div className={styles.close} onClick={() => onSelect ? (onSelect(null), toast.closeAll()) : ''}>
							<IoClose size={'1.6rem'} />
						</div>
					</div>
				</div>
			}
		</XyzTransition >
	);
}
