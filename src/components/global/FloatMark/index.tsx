import Link from 'next/link';

//styles
import styles from './index.module.scss';

//icons
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

//config
import { config } from './config';

export function FloatMark() {

	return (
		<div className={styles.container}>
			<p>{'Developed by '}<b>{'DznGusta'}</b></p>
			<div className={styles.socials}>
				<Link href={config.github} target={'_blank'} rel={'noreferrer'}>
					<FaGithub size={'1.6rem'} />
				</Link>
				<Link href={config.linkedin} target={'_blank'} rel={'noreferrer'}>
					<FaLinkedinIn size={'1.6rem'} />
				</Link>
			</div>
		</div>
	);
}
