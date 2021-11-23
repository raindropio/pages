export function Page({ is404 }) {
    return (
        <h1>{is404 ? "404" : "500"} Error</h1>
    )
}