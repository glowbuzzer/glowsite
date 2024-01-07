import * as React from "react"
import styled from "styled-components";
import {Button, Card} from "antd";

const StyledDiv= styled.div`
  .items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: space-between;
    
    .item {
      background: ${props => props.theme.colorBgContainer};
      margin: 10px;
      padding: 10px;
      border: 1px solid ${props => props.theme.colorBorder};
      
      .title {
        font-weight: bold;
      }
    }
  }
`

export default ({ subtitle }) => {
    return (
        <StyledDiv>
            <h1>{subtitle}</h1>

            <div className="items">
                <div className="item">
                    <div className="title">By email</div>
                    <div><a className="markdown-link" href="mailto:hello@glowbuzzer.com">hello@glowbuzzer.com</a></div>
                </div>
                <div className="item">
                    <div className="title">By post</div>
                    <div>
                        glowbuzzer Ltd<br/>
                        30 Hercules Way<br/>
                        Farnborough Aerospace Centre<br/>
                        GU14 6UU<br/>
                        UK
                    </div>
                </div>
                <div className="item">
                    <div className="title">Chat with us</div>
                    <div>Please use the chat function at the bottom of the page. We're standing by and ready to help!</div>
                </div>
            </div>

        </StyledDiv>
    )
}
