import { Breadcrumb, Menu } from "antd"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import {useNavCrumbs} from "../nav";

const StyledDiv = styled.div`
    padding: 10px 20px;
    background: white;

    @media (min-width: ${props => props.theme.breaks.leftNavCollapse}) {
        display: none;
    }

    .ant-dropdown-trigger:focus {
        background: red !important;
    }
`

export const BreadcrumbNav = () => {
    const crumbs = useNavCrumbs().slice(-2)

    const current = crumbs.pop() // we want to display crumb as menu

    if (!crumbs.length || !current) {
        return null
    }

    const last = crumbs[crumbs.length - 1]

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
                <Breadcrumb.Item
                    key={current.path}
                    overlay={
                        <Menu defaultSelectedKeys={["crumb:" + current.path]}>
                            {last.children.map(node => (
                                <Menu.Item key={"crumb:" + node.path}>
                                    <Link to={node.path}>{node.title}</Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    }
                >
                    {current.title}
                </Breadcrumb.Item>
            </Breadcrumb>
        </StyledDiv>
    )
}
