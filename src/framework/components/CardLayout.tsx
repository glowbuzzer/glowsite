import styled from "styled-components"

export const CardLayout = styled.div`
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 1000px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: 18px;
        margin: 20px auto;
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 22px;
    line-height: 1.7em;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    position: relative;
    overflow: hidden;

    .title {
        font-size: 1.4em;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .content {
        font-size: 1.05em;
    }

    // Soft two‑tone styles with row-wise left-right alternation on 2‑column layout
    /* Default mobile/stacked: alternate softly A/B */
    &:nth-child(odd) {
        background: ${props => props.theme.colorPrimaryBg};
        color: ${props => props.theme.colorText};
        border: 1px solid rgba(0, 0, 0, 0.04);
    }

    &:nth-child(even) {
        background: ${props => props.theme.colorBgElevated};
        color: ${props => props.theme.colorText};
        border: 1px solid rgba(0, 0, 0, 0.04);
    }

    /* On two‑column layout, flip A/B every row so shading alternates left‑right */
    @media (min-width: 768px) {
        /* Variant A indices: 1, 4, 5, 8, ... => 4n+1 and 4n+4 */
        &:nth-child(4n + 1),
        &:nth-child(4n + 4) {
            background: ${props => props.theme.colorPrimaryBg};
            border: 1px solid rgba(0, 0, 0, 0.04);

            &::before {
                height: 3px;
                background: ${props => props.theme.colorPrimary};
                opacity: 0.5;
            }
        }

        /* Variant B indices: 2, 3, 6, 7, ... => 4n+2 and 4n+3 */
        &:nth-child(4n + 2),
        &:nth-child(4n + 3) {
            background: ${props => props.theme.colorBgElevated};
            border: 1px solid rgba(0, 0, 0, 0.04);

            &::before {
                height: 3px;
                background: ${props => props.theme.colorPrimary};
                opacity: 0.25;
            }
        }
    }
`

export const Card = ({ title, content }) => (
    <CardContainer>
        <div className="title">{title}</div>
        <div className="content">{content}</div>
    </CardContainer>
)
