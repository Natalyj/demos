import styled from '@emotion/styled';

import { MENU_ITEMS } from '../model/constants.ts';
import { MenuItem } from './MenuItem.tsx';

const Container = styled.div`
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    user-select: none;
`;

export const Menu = () => {
    return (
        <Container>
            {MENU_ITEMS.map((item, index) => (
                <MenuItem key={index} item={item} />
            ))}
        </Container>
    );
};
