import styled from '@emotion/styled';

import { Menu } from '#widgets';

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
