import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './constants.ts';

export const IconRemove = () => (
    <svg
        width={DEFAULT_ICON_SIZE}
        height={DEFAULT_ICON_SIZE}
        viewBox="0 0 25 25"
    >
        <path
            fill={DEFAULT_ICON_COLOR}
            d="m18.1 12.5 5.7-5.7a4 4 0 1 0-5.7-5.6l-5.6 5.6-5.7-5.6a4 4 0 1 0-5.6 5.6l5.6 5.7-5.6 5.7a4 4 0 1 0 5.6 5.6l5.7-5.6 5.6 5.6a4 4 0 1 0 5.7-5.6l-5.7-5.7"
        />
    </svg>
);
