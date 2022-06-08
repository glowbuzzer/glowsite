// work around stupid react-router v6 relative link behaviour
export function relative_path(path: string) {
    return new URL(path, window.location.href).pathname
}

