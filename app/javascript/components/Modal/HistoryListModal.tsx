import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { HistoryList } from '../HistoryList'

interface Props {
    show?: boolean
    onHide?: () => void
}

export function HistoryListModal(props: Props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    History
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <HistoryList />

            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
