import styled from '@emotion/styled';

import { Menu } from '../Menu/Menu.tsx';

const Container = styled.div`
    display: grid;
`;

export const MainPage = () => {
    return (
        <Container>
            <Menu />
        </Container>
    );
};
