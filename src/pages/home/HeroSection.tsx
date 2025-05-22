import styled from "styled-components"

export const HeroSection = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 1.3em;
    //max-height: 300px;

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 50px 100px;

        @media (max-width: 976px) {
            padding: 25px 50px;
        }

        @media (max-width: 767px) {
            font-size: 0.8em;
            padding: 20px 0;
        }
    }

    h1 {
        margin-top: 0;
    }

    .hero-image {
        min-height: 100%;
        margin-left: auto;
        margin-right: 100px;
        fill: white;

        @media (max-width: 976px) {
            display: none;
        }
    }
`
