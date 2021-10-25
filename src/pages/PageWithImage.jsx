// import {height, src, width} from './tux.png?width=300&webp&metadata'
import myimage from './tux.png?width=900'

export default function PageWithImage() {
    return (
        <>
            <h1>Home</h1>
            <img src={myimage}/>
        </>
    )
}
