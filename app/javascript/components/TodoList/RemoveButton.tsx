import React from "react";
import { CloseButton } from "react-bootstrap";
import styled from "styled-components";
import axios from 'axios'

export const Wrapper = styled("div")`
    // padding: 4;
`;


interface Props {
    id: number | string
    onSuccess?: (id: number | string) => void;
    onError?: () => void
}

export const RemoveButton = (props: Props) => {
    const { id, onSuccess, onError } = props;
    const handleReset = (): void => {
        axios.delete(`/api/todos/${id}`).then(() => onSuccess && onSuccess(id)).catch(onError);
    };

    return <Wrapper><CloseButton onClick={handleReset} /></Wrapper>
}