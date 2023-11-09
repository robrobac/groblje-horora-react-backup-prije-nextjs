import { ThemeProvider } from 'styled-components'

const theme = {
    dark: {
        background: '#191919',

        darkText: '#191919',
        lightText: '#e3e3e3',
        grayText: '#5a5a5a',

        primary: '#fff',
        secondary: '#860000',

        contentWidth: '1200px',
        readingWidth: '700px',

        inputBackground: '#FFFFFF1A',
        inputBorder: '#FFFFFF1A',
    }
}

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}