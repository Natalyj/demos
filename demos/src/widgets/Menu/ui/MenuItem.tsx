import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

import { currentAlgorithm } from '#entities/Algorithm';
import { interactive } from '#shared/ui/interactive';

import { IMenuItem } from '../model/types.ts';

const Item = styled.div<{
    isInteractive?: boolean;
    depth: number;
    isActive: boolean;
}>`
    padding: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-left: ${({ depth }) => depth * 16}px;
    background-color: ${({ isInteractive }) =>
        isInteractive ? 'white' : 'transparent'};
    ${({ isInteractive, isActive }) => isInteractive && interactive(isActive)}
`;

interface Props {
    item: IMenuItem;
    depth?: number;
}

export const MenuItem = ({ item, depth = 0 }: Props) => {
    const [algorithm, setCurrentAlgorithm] = useAtom(currentAlgorithm);

    const isInteractive = useMemo(
        () => item.algorithm !== undefined,
        [item.algorithm],
    );

    const handleClick = useCallback(() => {
        if (item.algorithm !== undefined && item.algorithm !== algorithm) {
            setCurrentAlgorithm(item.algorithm);
        }
    }, [item.algorithm, algorithm]);

    return (
        <>
            <Item
                isInteractive={isInteractive}
                depth={depth}
                onClick={handleClick}
                isActive={item.algorithm === algorithm}
            >
                {item.label}
            </Item>
            {item.children && item.children.length > 0 && (
                <div>
                    {item.children.map((child, index) => (
                        <MenuItem key={index} item={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </>
    );
};
