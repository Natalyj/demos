import styled from '@emotion/styled';

import { MainPage } from '#pages/MainPage';

const AppContainer = styled.div`
    font-family: Montserrat, sans-serif;
`;

export const App = () => {
    return (
        <AppContainer>
            <MainPage />
        </AppContainer>
    );
};
