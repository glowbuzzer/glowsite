import * as React from "react"
import { useEffect, useState } from "react"
import { AutoComplete, Input } from "antd"
import lunr from "lunr"
import { useGlowsiteRoutes } from "./index"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons"

const StyledAutoComplete = styled(AutoComplete)`
    width: 200px;
    @media (max-width: 1200px) {
        width: 100px;
    }

    .ant-select-selection-search-input {
        border-radius: 15px !important;
        padding-top: 2px;
        padding-bottom: 1px;
    }

    input {
        //border-radius: 15px !important;
        padding: 0;
    }

    .rc-virtual-list-scrollbar-show {
        display: block !important;
    }
`

const StyledMenu = styled.div`
    .ant-select-item {
        padding: 0;
    }

    .search-result {
        padding: 5px 16px;

        .item-title {
            font-size: 1.1em;
        }

        .item-description {
            color: grey;
            white-space: normal;
            line-height: 1.2em;
            margin-bottom: 3px;
        }

        .item-path {
            color: grey;
            margin-top: -2px;
            font-size: 0.8em;

            span {
                display: inline-block;
                padding: 0 3px;
                margin: 0 1px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: 3px;
                line-height: 1.4em;
            }
        }
    }
`

export const Search = () => {
    const routes = useGlowsiteRoutes()
    const navigate = useNavigate()

    const [value, setValue] = useState("")
    const [options, setOptions] = useState([])
    const [idx, setIdx] = useState(null)
    const [loading, setLoading] = useState(false)

    function load() {
        if (!idx) {
            setLoading(true)
            fetch("/index.json")
                .then(r => r.json())
                .then(r => setIdx(lunr.Index.load(r)))
                .then(() => setLoading(false))
        }
    }

    useEffect(() => {
        if (idx) {
            const results = idx.search(value)
            update_options(results)
        }
    }, [idx])

    function update_options(results) {
        setOptions(
            results
                .map(r => {
                    const route = routes.find(route => route.path === r.ref)
                    // console.log("ROUTE", route)
                    return route
                        ? {
                              // value: r.ref,
                              label: (
                                  <div
                                      className="search-result"
                                      onClick={e => {
                                          // e.bubbles = false
                                          // e.preventDefault()
                                          e.stopPropagation()
                                          navigate(route.path)
                                      }}
                                  >
                                      <div className="item-title">{route.title}</div>
                                      {route.description?.length ? (
                                          <div className="item-description">
                                              {route.description}
                                          </div>
                                      ) : route.subtitle?.length ? (
                                          <div className="item-description">{route.subtitle}</div>
                                      ) : null}
                                      <div className="item-path">
                                          {route.path
                                              .split("/")
                                              .slice(0, -1)
                                              .filter(s => s.length > 0)
                                              .map(s => (
                                                  <span key={s}>{s}</span>
                                              ))}
                                      </div>
                                  </div>
                              )
                          }
                        : null
                })
                .filter(r => r)
        )
    }

    function update_value(e) {
        setValue(e.target.value)

        if (idx) {
            const results = idx.search(e.target.value)
            update_options(results)
        }
    }

    return (
        <StyledAutoComplete
            dropdownMatchSelectWidth={500}
            options={options}
            onChange={() => {}}
            onFocus={load}
            dropdownRender={menu => <StyledMenu>{menu}</StyledMenu>}
        >
            <Input
                // size="sn"
                placeholder="Search site"
                value={value}
                onChange={update_value}
                suffix={loading ? <LoadingOutlined /> : <SearchOutlined />}
            />
        </StyledAutoComplete>
    )
}
