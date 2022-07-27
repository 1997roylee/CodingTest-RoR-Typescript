import { useCallback, useState } from "react"

export const useModal = () => {
    const [isShow, setIsShow] = useState(false);

    const showModal = () => {
        setIsShow(true)
    }

    const hideModal = () => {
        setIsShow(false)
    }

    return {
        isShow,
        showModal: useCallback(showModal, []),
        hideModal: useCallback(hideModal, [])
    }
}