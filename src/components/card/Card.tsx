import type { CardDTO } from './types/card'
import styles from './Card.module.scss'

interface CardProps {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
    handleSetData: (eventValue: CardDTO) => void
}


function Card({ data, handleDialog, handleSetData }: CardProps) {

    const OpenDialog = () => {
        console.log('함수호출')
        handleDialog(true)
        handleSetData(data)
    }

    return (
        <div className={styles.card} >
            <img src={data.urls.small} alt={data.alt_description} className={styles.card__image} onClick={OpenDialog} />
        </div>
    )
}

export default Card