import styled from '@emotion/styled';

import { MainPage } from '#components';

const AppContainer = styled.div`
    font-family: Montserrat, sans-serif;
`;

const App = () => {
    return (
        <AppContainer>
            <MainPage />
        </AppContainer>
    );
};

export default App;
