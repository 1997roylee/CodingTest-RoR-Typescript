import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { Flex } from '../Flex'



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

export const HistoryList = () => {
    const [history, setHistory] = useState([])
    useEffect(() => {
        axios.get("/api/history").then((response) => {
            setHistory(response.data.history)
        })
    }, [])

    const revert = (id) => {
        axios.post(`/api/history/${id}/revert`).then(() => {
            window.location.reload()
        }).catch(() => { })
    }

    const handleRevert = (id) => () => revert(id);

    return <Stack gap={2}>
        {
            history.map((item: Version) => {

                return <Flex key={`History_${item.id}`}>
                    <p>
                        {renderText(item)}
                    </p>
                    <Button variant='light' onClick={handleRevert(item.id)}>Revert</Button>
                </Flex>
            })
        }
    </Stack>
}