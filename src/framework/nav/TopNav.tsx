import {useRootNav} from "../providers/NavProvider"
import {Link, useLocation} from "react-router-dom"
import {Menu, Layout, Space} from "antd"
import * as React from "react"
import styled from "@emotion/styled"


import Gblogo from '../../images/logos/small-logo.svg'

import {GithubOutlined, YoutubeOutlined} from "@ant-design/icons"

const StyledTopNav = styled.div`
    .ant-menu-submenu-title {
        :hover {
            
        }
        margin: 0 20px 0 20px;
    }
    .ant-layout-header {
      background: ${props => props.theme.color.TopNav};
    }
    .ant-menu {
      background: ${props => props.theme.color.TopNav};
    }
`

// doesn't work when placed in component above, I think because menu items are created dynamically
const StyledMenuItem = styled(Menu.Item)`
    &&& {
        padding: 8px 12px;
        height: auto;
        line-height: 20px;
        :hover {
            
        }
        .title {
            font-weight: bold;
        }
    }
`


const StyleOffsiteLinks = styled.div`
float: right;
`


const StyledNavLogo = styled.div`
 float: left;
  width: 180px;
    background: ${props => props.theme.color.TopNav};
`

// #d9d9d9 = top nav

const {Header} = Layout;

export const TopNav = () => {
    const {pathname} = useLocation()
    const nav = useRootNav()

    console.log(nav)
    // we are expecting each node in the top nav to have children

    return (

        <StyledTopNav>
            <Layout>
                <Header >
                    <StyledNavLogo>
                        <a href="/"><img src={Gblogo}/></a>
                    </StyledNavLogo>
                    <StyleOffsiteLinks>
                        <Space size="middle">
                            <a href={"https://www.github.com/glowbuzzer"}><GithubOutlined
                                style={{fontSize: '24px', color: '#9254de'}}/></a>
                            <a href={"https://www.youtube.com/glowbuzzer"}><YoutubeOutlined
                                style={{fontSize: '24px', color: '#9254de'}}/></a>
                        </Space>
                    </StyleOffsiteLinks>

                    <Menu mode="horizontal" selectedKeys={[pathname]}>
                        {nav.children.map(({path, title, children}) =>
                            children?.length ? (
                                <Menu.SubMenu key={path} className={"capitalize"} title={title} >
                                    {children.map(({type, path, title, children}) => {
                                        const to = children.length ? children[0].path : path
                                        return (
                                            <Menu.Item key={path}>
                                                <Link to={to}>{title}</Link>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.SubMenu>NO CHILDREN</Menu.SubMenu>
                            )
                        )}
                    </Menu>
                </Header>
            </Layout>
        </StyledTopNav>
    )
}
