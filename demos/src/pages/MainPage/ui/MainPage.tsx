import styled from '@emotion/styled';

import { AlgorithmView, Menu } from '#widgets';

const Container = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100vh;
`;

export const MainPage = () => {
    return (
        <Container>
            <Menu />
            <AlgorithmView />
        </Container>
    );
};
