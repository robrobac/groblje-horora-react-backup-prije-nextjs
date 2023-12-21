import { ThemeProvider } from 'styled-components'

const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let bigInt = parseInt(hex, 16);
    let r = (bigInt >> 16) & 255;
    let g = (bigInt >> 8) & 255;
    let b = bigInt & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const theme = {
    dark: {
        background: '#161616',

        darkText: '#191919',
        lightText: '#e3e3e3',
        grayText: '#5a5a5a',

        primary: '#fff',
        secondary: '#860000',

        contentWidth: '1200px',
        contentPadding: '1rem',
        readingWidth: '700px',

        inputBackground: '#FFFFFF1A',
        inputBorder: '#FFFFFF1A',
        lightInputBorder: '#959595',

        // Font Sizes
        textXS: '12px',
        textS: '14px',
        textM: '16px',
        textL: '20px',
        textXL: '24px',
        textXXL: '32px',
        textXXXL: '48px',
        textHUGE: '60px',

        // Colors
        colorRED: '#7C2E2E',
        colorREDhover: '#552020',
        colorWHITE: '#eddede',
        colorWHITE80: () => hexToRgba('#eddede', 0.8),
        colorWHITE50: () => hexToRgba('#eddede', 0.5),
        colorWHITE25: () => hexToRgba('#eddede', 0.25),
        colorBLACK: '#141414',
        colorBLACK80: () => hexToRgba('#141414', 0.8),
        colorBLACK50: () => hexToRgba('#141414', 0.5),
        colorBLACK25: () => hexToRgba('#141414', 0.25),

        // Content widths
        normalWidth: '1200px',
        smallWidth: '768px',

        radiusS: '5px',
        radiusM: '10px',
        radiusL: '20px',
    }
}

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}