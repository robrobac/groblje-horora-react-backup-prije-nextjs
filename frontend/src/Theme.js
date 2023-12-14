import { ThemeProvider } from 'styled-components'

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


        textS: '14px',
        textM: '16px',
        textL: '20px',
        textXL: '24px',
        textXXL: '32px',

        colorRED: '#7C2E2E',
        colorREDhover: '#552020',
        colorWHITE: '#eddede',
        colorBLACK: '#141414',

        radiusS: '5px',
        radiusM: '10px',
    }
}

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}