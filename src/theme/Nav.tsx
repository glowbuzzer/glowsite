import TweenOne from 'rc-tween-one';
import {Menu} from "antd";
import styled from "styled-components";

const StyledDiv = styled.div`
  //position: absolute;
  background-color: rgba(255, 255, 255, 0);
  .ant-menu {
    box-shadow: none;
  }
`

export const Nav = () => {
    return <TweenOne
        component="header"
        animation={{opacity: 0, type: 'from'}}
        className="header3 home-page-wrapper"
    >
        <StyledDiv>
            <div className="home-page">
                <Menu
                    mode={false ? 'inline' : 'horizontal'}
                    defaultSelectedKeys={['sub0']}
                    theme="light"
                >
                    <Menu.Item className="header3-item" key="sub0">Testing</Menu.Item>
                </Menu>
            </div>
        </StyledDiv>

    </TweenOne>
}
