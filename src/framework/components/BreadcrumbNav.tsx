import * as React from "react"
import { Breadcrumb, Menu } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {useNavCrumbs} from "../nav";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"

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

    const breadcrumbs: BreadcrumbItemType[] = crumbs.map(node => {
        const non_navigable = node.children[0].children.length
        return {
            key: "crumb:" + node.path,
            title: non_navigable ? (
                node.title
            ) : (
                <Link to={node.children[0].path}>{node.title}</Link>
            )
        }
    })

    const last_nav_item = crumbs[crumbs.length - 1]
    const last_menu_item_children: BreadcrumbItemType[]=last_nav_item.children.map(node => ({
        key: "crumb:"+node.path,
        title: <Link to={node.path}>{node.title}</Link>
    }))

    const last_menu_item:BreadcrumbItemType={
        key: current.path,
        title: current.title,
        menu: {
            items: last_menu_item_children
        }
    }

    breadcrumbs.push(last_menu_item)

    return (
        <StyledDiv>
            <Breadcrumb items={breadcrumbs}/>
        </StyledDiv>
    )
}
