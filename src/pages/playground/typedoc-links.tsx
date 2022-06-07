import * as React from "react"
import {Markdown} from "../../framework/components/Markdown"
import {Section} from "../../framework/components/Section";

const link_text = "This is a link in typedoc syntax to the {@link frag} page! These only work in `Markdown` components, used by typedoc pages"

export default () => <Section spaced><Markdown>{link_text}</Markdown></Section>
