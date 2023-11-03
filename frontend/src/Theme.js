import { ThemeProvider } from 'styled-components'

const theme = {
    dark: {
        background: '#191919',

        darkText: '#191919',
        lightText: '#fff',

        primary: '#fff',
        secondary: '#860000',

        contentWidth: '1200px',
        readingWidth: '700px',
    }
}

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}