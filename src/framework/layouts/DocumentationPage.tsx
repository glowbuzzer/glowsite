import { ContexualLeftNav } from "../nav/ContexualLeftNav"
import styled from "@emotion/styled"
import { BaseLayout } from "./BaseLayout"
import { MenuUnfoldOutlined } from "@ant-design/icons"
import { Section } from "../components/Section"

const StyledDiv = styled.div`
    label: DocumentationPage;
    display: flex;
    flex-grow: 1;

    .left {
        flex-grow: 20;
        flex-basis: 0;
        border-left: 1px solid rgba(0,0,0,0.05);
      
        .collapsed {
            display: none;
            font-size: 2em;
            padding: 10px;
        }

        @media (max-width: 768px) {
            flex-basis: 50px;
            flex-grow: 0;

            .full {
                display: none;
            }

            .collapsed {
                display: block;
            }
        }
    }

    .content {
        padding: 20px;
        flex-basis: 0;
        flex-grow: 80;

        background: ${props => props.theme.color.LightGrey};
    }

    // only format code elements outside of pre block
    *:not(pre) > code {
        //background: #d9d9d9;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        padding: 0 3px 0 3px;
    }
`

export const DocumentationPage = ({ children }) => {
    return (
        <BaseLayout>
            <Section background={"White"} expand>
                <StyledDiv>
                    <div className="left">
                        <div className="full">
                            <ContexualLeftNav />
                        </div>
                        <div className="collapsed">
                            <MenuUnfoldOutlined onClick={() => alert("TODO")} />
                        </div>
                    </div>
                    <div className="content">{children}</div>
                </StyledDiv>
            </Section>
        </BaseLayout>
    )
}
