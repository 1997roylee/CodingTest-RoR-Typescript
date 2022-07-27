import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import axios, { AxiosResponse } from 'axios'

export const _ResetButton = styled(Button)`
  margin-top: 1em;
`;


interface Props {
    todoGroupId: number | string
    onSuccess?: (response: AxiosResponse<any, any>) => void;
    onError?: () => void
}

export const ResetButton = (props: Props) => {
    const handleReset = (): void => {
        axios.post(`/api/todo_groups/${props.todoGroupId}/reset`).then(props.onSuccess).catch(props.onError);
    };

    return <_ResetButton variant='light' onClick={handleReset}>Reset</_ResetButton>
}