import { Menu } from "antd"
import { Link } from "react-router-dom"
import { useGbcSchema } from "../../typedoc/typedoc-hooks"
import { StyledLeftNavMenu } from "../nav/ContexualLeftNav"

export const GbcSchemaLeftNav = ({ current }) => {
    const groups = useGbcSchema()

    return (
        <StyledLeftNavMenu>
            <div className="title">Glowbuzzer Control Schema</div>
            <Menu mode="inline" defaultSelectedKeys={[current]}>
                <Menu.SubMenu key="enums" className={"capitalize"} title="Enums">
                    {groups.Enumeration.map(c => (
                        <Menu.Item key={c.name}>
                            <Link to={"/docs/gbc/schema/" + c.name}>{c.name}</Link>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
                <Menu.SubMenu key="types" className={"capitalize"} title="Types">
                    {groups["Type alias"].map(c => (
                        <Menu.Item key={c.name}>
                            <Link to={"/docs/gbc/schema/" + c.name}>{c.name}</Link>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
        </StyledLeftNavMenu>
    )
}
