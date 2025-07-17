import { css } from '@emotion/react';

export const interactive = (isActive = false) => css`
    --animation-function: cubic-bezier(0.25, 0, 0.3, 1);

    user-select: none;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${!isActive &&
    css`
        &:hover:not(:disabled) {
            opacity: 0.8;
            background: rgba(0, 0, 0, 0.1);
        }

        &:active:not(:disabled) {
            opacity: 0.9;
            background: rgba(0, 0, 0, 0.2);
        }
    `}

    ${isActive &&
    css`
        opacity: 0.9;
        background: rgba(0, 0, 0, 0.2);
        cursor: default;
    `}

    @media (prefers-reduced-motion: no-preference) {
        transition:
            background-color 0.5s var(--animation-function),
            opacity 0.5s var(--animation-function);
    }
`;
