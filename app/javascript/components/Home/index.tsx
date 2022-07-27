import React from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import axios from 'axios'
import { useModal } from '../../hooks/useModal'
import { TodoGroupState, useTodoGroupStore } from '../../stores'
import { CreateGroupModal } from '../Modal/CreateGroupModal'
import { TodoGroupList } from '../TodoGroupList'
import { Flex } from '../Flex'
import { useWebsocket } from '../../hooks/useWebsocket'
import { UserId } from '../../utils/constants'
import { HistoryListModal } from '../Modal/HistoryListModal'


interface Props {
    todoGroups: TodoGroup[]
}

const Home = (props: Props) => {
    const { isShow, hideModal, showModal } = useModal();
    const { isShow: isHistoryShow, hideModal: hideHistoryModal, showModal: showHistoryModal } = useModal();
    const setTodoGroups = useTodoGroupStore((state: TodoGroupState) => state.setTodoGroups)
    useWebsocket();

    React.useEffect(() => {
        setTodoGroups(props.todoGroups);

        const token = document.querySelector(
            "[name=csrf-token]"
        ) as HTMLMetaElement;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
        axios.defaults.headers.common["X-USER-ID"] = UserId;
    }, []);

    return <Container> <Stack gap={4}>
        <Flex style={{ marginTop: 24 }}>
            <h1>Todo List</h1>
            <ButtonGroup>
                <Button onClick={showModal} style={{ width: 200 }}>Create a new group</Button>
                <Button onClick={showHistoryModal} variant="light" style={{ width: 200 }}>Show History</Button>
            </ButtonGroup>

        </Flex>
        <TodoGroupList />
    </Stack>
        <CreateGroupModal show={isShow} onHide={hideModal} />
        <HistoryListModal show={isHistoryShow} onHide={hideHistoryModal} />
    </Container>
}

export default Home