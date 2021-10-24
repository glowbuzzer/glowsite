// import {height, src, width} from './tux.png?width=300&webp&metadata'
import X from './tux.png?width=300;900;1200&webp&metadata'

console.log("X", X)

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            {/*<img src={src} width={width} height={height}/>*/}
        </>
    )
}
