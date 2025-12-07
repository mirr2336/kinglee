import type { CardDTO } from './types/card'
import styles from './Card.module.scss'

interface CardProps {
    data: CardDTO
}


function Card({ data }: CardProps) {

    return (
        <div className={styles.card} >
            <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} />
        </div>
    )
}

export default Card