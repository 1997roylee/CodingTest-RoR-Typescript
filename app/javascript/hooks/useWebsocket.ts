import actionCable from 'actioncable'
import { useLayoutEffect } from "react"
import { useDiff } from "./useDiff"

const cable = actionCable.createConsumer('wss://3000-exploratort-codingtestr-3zfqsmpxzon.ws-us54.gitpod.io/cable')

export const useWebsocket = () => {
    useLayoutEffect(() => {
        cable.subscriptions.create
            (
                "TodosChannel",
                {
                    received: (message: any) => {
                        const { type, payload, user_id } = message;
                        useDiff(type, payload, user_id)
                    }
                }
            )
    }, [])
}