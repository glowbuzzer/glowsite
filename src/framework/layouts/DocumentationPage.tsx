import { ContexualLeftNav } from "../nav/ContexualLeftNav"
import styled from "styled-components"
import { BaseLayout } from "./BaseLayout"
import { Section } from "../components/Section"
import * as React from "react"

const StyledDocumentationPage = styled.div`
    label: DocumentationPage;
    display: flex;
    flex-grow: 1;
    // min-width to ensure pre respects max-width
    // https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
    min-width: 0;

    .left {
        flex-grow: 20;
        flex-basis: 0;
        border-left: 1px solid rgba(0, 0, 0, 0.05);

        @media (max-width: 768px) {
            display: none;
        }
    }

    .content {
        padding: 0 20px 20px 20px;
        flex-basis: 0;
        flex-grow: 80;
        min-width: 0; // as above

        background: ${props => props.theme.color.LightGrey};

        h3 {
            padding-top: 5px;
            padding-bottom: 5px;
        }

        h2 {
            padding-top: 5px;
            padding-bottom: 5px;
        }
    }
`

export const DocumentationPage = ({ left, children }) => (
    <BaseLayout>
        <Section background={"White"} expand>
            <StyledDocumentationPage>
                <div className="left">
                    <div className="full">{left}</div>
                </div>
                <div className="content">{children}</div>
            </StyledDocumentationPage>
        </Section>
    </BaseLayout>
)

export const DefaultDocumentationPage = props => (
    <DocumentationPage left={<ContexualLeftNav />} {...props} />
)
