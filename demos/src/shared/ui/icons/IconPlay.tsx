import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './constants.ts';

export const IconPlay = () => (
    <svg
        height={DEFAULT_ICON_SIZE}
        width={DEFAULT_ICON_SIZE}
        viewBox="0 0 512 512"
    >
        <path
            fill={DEFAULT_ICON_COLOR}
            d="M500.2 237 30.9 2.1A21.4 21.4 0 0 0 0 21.3v469.4a21.4 21.4 0 0 0 30.9 19l469.3-234.6a21.4 21.4 0 0 0 0-38.2z"
        />
    </svg>
);
