import {useRouteMatch} from "react-router";

// TODO: commented for now to demonstrate chunking (if we include it here without lazy loading it will be included in the main chunk)
// import {useTypedocItem} from "./typedoc-hooks";

export const TypedocItem = () => {
    const {params} = useRouteMatch<{ name: string }>()

    // const item=useTypedocItem(params.name)
    const item={kindString: "TODO"}

    return <div>
        <h1>Schema item: {params.name} ({item.kindString})</h1>
    </div>
}
