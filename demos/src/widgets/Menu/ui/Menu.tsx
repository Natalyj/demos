import styled from '@emotion/styled';

import { MENU_ITEMS } from '../model/constants.ts';
import { MenuItem } from './MenuItem.tsx';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
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
