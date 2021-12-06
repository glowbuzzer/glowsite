import * as React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Tag } from "antd"

const StyledPageTag = styled.div`
    padding-bottom: 18px;

    .ant-tag {
        :hover {
            font-weight: bold;
        }
    }
    // .tag {
    //     display: inline-block;
    //     margin-right: 0.5em;
    //     padding: 1px 12px 0 12px;
    //     font-size: 0.8em;
    //     font-weight: bold;
    //     background: rgba(0, 0, 255, 0.05);
    //     border: 1px solid rgba(0, 0, 0, 0.2);
    //     color: rgba(0, 0, 0, 0.6);
    //     border-radius: 3px;
    //
    //     :hover {
    //         background: white;
    //         color: black;
    //     }
    // }
`

const tagColors: string[] = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
]

// export const PageTag = ({ tags }) => {
//     return (
//         <StyledPageTag>
//             {tags.slice(0, 10).map(tag => (
//                 <Link key={tag} className="tag" to={"/blogs/tag/" + tag}>
//                     {tag}
//                 </Link>
//             ))}
//         </StyledPageTag>
//     )
// }
export const PageTag = ({ tags }) => {
    return (
        <StyledPageTag>
            {tags.map(
                (tag, index) =>
                    index <= 10 && (
                        <Link key={tag} className="tag" to={"/blogs/tag/" + encodeURIComponent(tag)}>
                            <Tag color={tagColors[index]}> {tag}</Tag>
                        </Link>
                    )
            )}
        </StyledPageTag>
    )
}
