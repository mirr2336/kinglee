import { useState, useEffect } from 'react'
import styles from './DetailDialog.module.scss'
import type { CardDTO } from '@/components/card/types/card'
import toast, { toastConfig } from 'react-simple-toasts'
import "react-simple-toasts/dist/theme/dark.css"

toastConfig({ theme: 'dark' })

interface Props {
    data: CardDTO
    handleDialog: (eventValue: boolean) => void
}

function DetailDialog({ data, handleDialog }: Props) {

    const [bookmark, setBookmark] = useState(false)

    //다이얼로그 끄기
    const CloseDialog = () => {
        handleDialog(false)
    }

    const addBookMark = (selected: CardDTO) => {
        setBookmark(true)
        const LOCALSTORAGE_VALUE = localStorage.getItem('bookmark');
        if (LOCALSTORAGE_VALUE === null) return;
        const getLocalStoage = JSON.parse(LOCALSTORAGE_VALUE)

        //1 로컬스토리지에  bookmark 라는 데이터가 없을 겨웅
        if (!getLocalStoage || getLocalStoage === null) {
            localStorage.setItem("bookmark", JSON.stringify([selected]))
            toast("해당 이미지를 북마크에 저장하였습니다.😊")
        }
        else {
            //해당 이미지가 이미 로컬 스토리지 bookmark 라는 데이터에 저장되어 있을경우
            if (getLocalStoage.findIndex((item: CardDTO) => item.id === selected.id) > -1) {
                toast("해당 이미지는 이미 북마크에 추가된 상태입니다.😎")
            } else {
                // 해당 이미지가 로컬 스토리지 bookark 라는 데이터에 저장되어 있지 않을경우 + bookmark 라는 데이터에 이미 어떤 값이 담겨 있는 경우
                const res = [...getLocalStoage]
                res.push(selected)
                localStorage.setItem('bookmark', JSON.stringify(res))

                toast('해당 이미지를  북마크에 저장하였습니다. 😊')
            }

        }
    }

    const handleOpenPopupDownload = (url: string) => {
        // 새 팝업 창을 엽니다.
        const popupWindow = window.open(url, '_blank', 'width=600,height=400');

        if (popupWindow) {
            // 팝업이 성공적으로 열렸다면, 일정 시간 후 팝업을 닫을 수 있습니다.
            // 하지만 다운로드는 백그라운드에서 이루어지므로 사용자가 인지하기 어렵습니다.
            setTimeout(() => {
                if (!popupWindow.closed) {
                    // popupWindow.close(); // 팝업 창을 자동으로 닫는 것은 사용자 경험에 좋지 않을 수 있습니다.
                }
            }, 3000);
        } else {
            alert('팝업 차단 설정으로 인해 새 창을 열 수 없습니다. 팝업 차단을 해제해주세요.');
        }
    };

    useEffect(() => {
        const LOCALSTORAGE_VALUE = localStorage.getItem('bookmark');
        if (LOCALSTORAGE_VALUE === null) return;
        const getLocalStoage = JSON.parse(LOCALSTORAGE_VALUE)

        if (getLocalStoage && getLocalStoage.findIndex((item: CardDTO) => item.id === data.id) > -1) {
            setBookmark(true)
        } else if (!getLocalStoage) return

        // ESC 클릭시 닫기
        const escKeyDownClose = (event: any) => {
            if (event.key === "Escape") {
                CloseDialog();
            }
        }

        window.addEventListener('keydown', escKeyDownClose)
        return () => window.removeEventListener('keydown', escKeyDownClose)
    }, [])

    return (
        <div className={styles.container} >
            <div className={styles.container__dialog}>
                <div className={styles.container__dialog__header}>
                    <div className={styles.close}>
                        <button className={styles.close__button} onClick={CloseDialog}>
                            {/* 구글 아이콘을 사용 */}
                            <span className="material-symbols-outlined" style={{ fontSize: 28 + 'px' }}>
                                close
                            </span>
                        </button>
                        <img src={data.user.profile_image.small} alt="사진작가 프로필 사진" className={styles.close__authorImage} />
                        <span className={styles.close__authorName}>{data.user.name}</span>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles.bookmark__button} onClick={() => addBookMark(data)} >
                            {/* 구글 아이콘을 사용 */}
                            {bookmark === false ? (
                                <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px' }}>
                                    favorite
                                </span>
                            ) : (
                                <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px', color: 'red' }}>
                                    favorite
                                </span>
                            )}
                        </button>
                        <button className={styles.bookmark__button} onClick={() => { handleOpenPopupDownload(data.urls.full) }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 + 'px' }}>
                                download
                            </span>
                        </button>
                    </div>
                </div>
                <div className={styles.container__dialog__body}>
                    <img src={data.urls.small} alt="상세이미지" className={styles.image} />
                </div>
                <div className={styles.container__dialog__footer}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>이미지 크기</span>
                            <span className={styles.infoBox__item__value}>{data.width} X {data.height}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>업로드</span>
                            <span className={styles.infoBox__item__value}>{data.created_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>마지막 업데이트</span>
                            <span className={styles.infoBox__item__value}>{data.updated_at.split('T')[0]}</span>
                        </div>
                        <div className={styles.infoBox__item}>
                            <span className={styles.infoBox__item__label}>다운로드</span>
                            <span className={styles.infoBox__item__value}>{data.likes}</span>
                        </div>
                    </div>
                    <div className={styles.tagBox}>
                        {data.alt_description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailDialog