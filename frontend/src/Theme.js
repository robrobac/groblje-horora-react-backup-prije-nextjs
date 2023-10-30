import { ThemeProvider } from 'styled-components'

const theme = {
    dark: {
        background: '#191919',
        primary: '#fff',
        darkText: '#191919',
        secondary: '#860000',
        header: '#929292',

        contentWidth: '1200px',
        contentPadding: '0 100px'
    }
}

export default function Theme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}