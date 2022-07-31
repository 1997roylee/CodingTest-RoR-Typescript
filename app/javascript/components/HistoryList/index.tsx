import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

import { Flex } from '../Flex'
import { useTodoGroupStore, TodoGroupState } from '../../stores'


const renderText = (version: Version) => {
    switch (version.item_type) {
        case "Todo":
            if (version.event === "update")
                return `You ${version.event} ${version.item_type} ${version.new_object?.title || version.item_id} ${version.event === "update" ? `checked status: ${version.new_object?.checked}` : null}`
            else
                return `You ${version.event} ${version.item_type} ${version.new_object?.title || version.item_id}`
        case "TodoGroup":
            return `You ${version.event} ${version.item_type} ${version.new_object?.name || version.item_id}`
    }
}

interface Props {
    onUndoSuccess: () => void
}

export const HistoryList = ({ onUndoSuccess }: Props) => {
    const [history, setHistory] = useState([])
    const reload = useTodoGroupStore((state: TodoGroupState) => state.reload)
    useEffect(() => {
        axios.get("/api/history").then((response) => {
            setHistory(response.data.history)
        })
    }, [])

    const revert = (id) => {
        axios.post(`/api/history/${id}/revert`).then(() => {
            reload()
            onUndoSuccess()
        })
    }

    const handleRevert = (id) => () => revert(id);

    return <Stack gap={2}>
        {
            history.map((item: Version) => {

                return <Flex key={`History_${item.id}`}>
                    <p style={{ flex: 1 }}>
                        {renderText(item)}
                    </p>
                    <span style={{ padding: "0 12" }}>
                        {dayjs(item.created_at).fromNow()}
                    </span>
                    <Button variant='light' onClick={handleRevert(item.id)}>Undo</Button>
                </Flex>
            })
        }
    </Stack>
}