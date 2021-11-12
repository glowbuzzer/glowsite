import { useNavCrumbs } from "../providers/NavProvider"
import { Breadcrumb, Menu } from "antd"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

const StyledDiv = styled.div`
    padding: 10px 20px;
    background: white;

    @media (min-width: ${props => props.theme.breaks.leftNavCollapse}) {
        display: none;
    }
`

export const BreadcrumbNav = () => {
    const crumbs = useNavCrumbs().slice(-2)

    const current = crumbs.pop() // we want to display crumb as menu

    console.log("CRUMBS", crumbs)

    if (!current) {
        return null
    }

    const last = crumbs[crumbs.length - 1]

    const menu = (
        <Menu
            key={"crumb:" + current.path}
            selectedKeys={["crumb:" + current.path]}
            forceSubMenuRender
        >
            {last.children.map(node => (
                <Menu.Item key={"crumb:" + node.path}>
                    <Link to={node.path}>{node.title}</Link>
                </Menu.Item>
            ))}
        </Menu>
    )
    return (
        <StyledDiv>
            <Breadcrumb>
                {crumbs.map(node => {
                    const non_navigable = node.children[0].children.length
                    return (
                        <Breadcrumb.Item key={"crumb:" + node.path}>
                            {non_navigable ? (
                                node.title
                            ) : (
                                <Link to={node.children[0].path}>{node.title}</Link>
                            )}
                        </Breadcrumb.Item>
                    )
                })}
                <Breadcrumb.Item key={current.path} overlay={menu}>
                    <Link to={current.path}>{current.title}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
        </StyledDiv>
    )
}
