import draftToHtml from "draftjs-to-html"

export const draftToHtmlConvert = (rawContent) => {
    const markup = draftToHtml(
        rawContent,
    )
    return markup
}