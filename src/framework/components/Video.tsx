// export const YoutubeEmbed = ({ embedId }) => (
//     <div style={{ overflow: "hidden", position: "relative", padding: "50px" }}>
//         <iframe
//             width="853"
//             height="480"
//             src={`https://www.youtube.com/embed/${embedId}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="Embedded youtube"
//         />
//     </div>
// )

export const YoutubeEmbed = ({ embedId }) => {
    return (
        <div
            className="video"
            style={{
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0
            }}
        >
            <iframe
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
            />
        </div>
    )
}
