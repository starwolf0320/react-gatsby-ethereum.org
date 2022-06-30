// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Components
import Icon from "../Icon"
import Link from "../Link"
import { StyledSelect as Select } from "../SharedStyledComponents"
import Tooltip from "../Tooltip"

// Data
import walletFilterData from "../../data/wallets/wallet-filters"

// Icons
import BuyCrypto from "../../assets/wallets/buy_crypto.svg"
import ENSSupport from "../../assets/wallets/ens_support.svg"
import ERC20Support from "../../assets/wallets/erc_20_support.svg"
import GasFeeCustomization from "../../assets/wallets/gas_fee_customization.svg"
import HardwareSupport from "../../assets/wallets/hardware_support.svg"
import Layer2 from "../../assets/wallets/layer_2.svg"
import NFTSupport from "../../assets/wallets/nft_support.svg"
import NonCustodial from "../../assets/wallets/non_custodial.svg"
import OpenSource from "../../assets/wallets/open_source.svg"
import RPCImporting from "../../assets/wallets/rpc_importing.svg"
import Staking from "../../assets/wallets/staking.svg"
import WalletConnect from "../../assets/wallets/walletconnect.svg"
import ConnectDapps from "../../assets/wallets/connect_dapps.svg"
import WithdrawCrypto from "../../assets/wallets/withdraw_crypto.svg"
import Multisig from "../../assets/wallets/multisig.svg"
import SocialRecover from "../../assets/wallets/social_recover.svg"
import Swap from "../../assets/wallets/swap.svg"
import Eip1559 from "../../assets/wallets/eip1559.svg"
import Warning from "../../assets/staking/warning-product-glyph.svg"
import GreenCheck from "../../assets/staking/green-check-product-glyph.svg"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

// Styles
const Container = styled.table`
  width: 100%;
  th {
    font-weight: normal;
    p {
      font-size: 0.9rem;
    }
  }
`

const WalletContainer = styled(Container)`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  :hover {
    background: ${(props) => props.theme.colors.boxShadow};
    transition: 0.5s all;
  }
`

const Grid = styled.tr`
  display: grid;
  grid-template-columns: 40% auto auto auto 5%;
  width: 100%;
  column-gap: 0.5rem;
  align-items: center;

  p {
    margin: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 60% auto 0% 0% 5%;

    th:nth-of-type(3) {
      display: none;
    }
    th:nth-of-type(4) {
      display: none;
    }

    td:nth-of-type(3) {
      display: none;
    }
    td:nth-of-type(4) {
      display: none;
    }
  }
`

const WalletContentHeader = styled(Grid)`
  position: sticky;
  top: 0;
  padding: 8px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  th {
    padding: 0;
    border-bottom: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: auto;
    gap: 1rem;
    text-align: center;
    th:nth-of-type(1) {
      text-align: center;
    }
    th:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 1rem;
      &:before {
        white-space: nowrap;
        content: "Compare features";
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    top: 50;
  }
`

const Wallet = styled(Grid)`
  padding: 25px 4px;
  td {
    padding: 0;
    border-bottom: none;
    height: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 25px 1rem;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: 0.9rem;
    padding-right: 0.3rem;
    transition: 0.5s all;
    svg {
      fill: ${(props) => props.theme.colors.text};
      transition: 0.5s all;
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.text};
      }
    }

    .react-select__indicators {
      .react-select__indicator-separator {
        background: none;
      }
      .react-select__indicator {
        color: ${(props) => props.theme.colors.text};
        padding: 0;
      }
    }

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      cursor: pointer;
      border-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.background};
      transition: 0.5s all;
      svg {
        fill: ${(props) => props.theme.colors.background};
        transition: 0.5s all;
      }

      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.background};
        }
      }

      .react-select__indicators {
        .react-select__indicator-separator {
          background: none;
        }
        .react-select__indicator {
          color: ${(props) => props.theme.colors.text};
        }
      }
    }
  }

  .react-select__control--is-focused {
    border: border: 1px solid ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.primary};
    svg {
      fill: ${(props) => props.theme.colors.background};
      transition: 0.5s all;
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.background};
      }
    }

    .react-select__indicators {
      background: ${(props) => props.theme.colors.primary};
      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.background};
        }
      }

      .react-select__indicators {
        .react-select__indicator {
          color: ${(props) => props.theme.colors.background};
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 0;
    }
  }
`

const FlexInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-left: 0.3rem;

  p {
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  p + p {
    margin-top: 0.1rem;
    font-size: 0.9rem;
    line-height: 1rem;
    font-weight: normal;
  }
`

const FlexInfoCenter = styled(FlexInfo)`
  justify-content: center;
  cursor: pointer;
  height: 100%;
  display: flex;
`

const Image = styled(GatsbyImage)`
  height: 56px;
  width: 56px;
`

const SecondaryText = styled.p`
  font-size: 0.7rem;
  line-height: 0.85rem;
  color: ${(props) => props.theme.colors.text200};

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const SecondaryTextMobile = styled.p`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: block;
    font-size: 0.7rem;
    line-height: 0.85rem;
    margin: 0;
    color: ${(props) => props.theme.colors.text200};
  }
`

const WalletMoreInfoArrow = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const WalletMoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 65px auto;
  width: 100%;
`

const WalletMoreInfoCategory = styled.div`
  width: 100%;
  margin: 3rem 0 0;
  :first-child {
    margin: 0.5rem 0 0;
  }

  h4 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0 0.2rem 0.5rem;
    display:block;
    font-size; 1rem;
  }
`

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-wrap: nowrap;
    flex-direction: column;
  }
`

const ColoredLine = styled.div<{ color: string }>`
  --color: ${(props) => props.color};
  margin: auto;
  width: 0.25rem;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--color) 0%,
    rgba(217, 217, 217, 0) 97.4%
  );
`

const FeatureLabel = styled.div<{ hasFeature: boolean }>`
  display: flex;
  gap: 0.2rem;
  font-size: 0.9rem;
  line-height: 1rem;
  align-items: center;
  padding: 0.2rem;
  margin: 0 1rem;
  position: relative;
  width: 200px;
  p {
    margin-bottom: 0;
    flex: none;
    color: ${(props) =>
      props.hasFeature
        ? props.theme.colors.text
        : props.theme.colors.secondary};
    text-decoration: ${(props) => (props.hasFeature ? "none" : "line-through")};
  }
  span + p {
    text-decoration: none;
  }
  p + div,
  div + div {
    svg {
      width: 1.5rem;
      fill: ${(props) => props.theme.colors.secondary};
      padding-right: 0.5rem;
    }
  }
`

const FeatureIcon = styled.div<{ hasFeature: boolean }>`
  svg {
    width: 1.75rem;
    height: 1.75rem;

    path {
      fill: ${(props) =>
        props.hasFeature
          ? props.theme.colors.text
          : props.theme.colors.secondary};
    }
  }
`

const SocialsContainer = styled.div`
  margin-top: 1rem;
  p {
    margin: 0;
  }
  a {
    height: 32px;
  }
`

const Socials = styled.div`
  display: flex;
  gap: 0.8rem;
  p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }
  a {
    height: auto;
    align-items: center;
    display: flex;
    :hover {
      opacity: 0.8;
    }
  }
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text300};
  margin: 2rem 1rem;
  font-size: 0.875rem;
  display: flex;
  flex-wrap: no-warp;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
    flex-flow: column-reverse;
  }
  a {
    border-radius: 4px;
    padding: 0.3rem 0.7rem;
    margin: 0.3rem;
    text-decoration: none;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
    @media (max-width: ${(props) => props.theme.breakpoints.m}) {
      margin-left: 0;
      margin-bottom: 0.6rem;
    }
    :after {
      margin-right: 0.2rem;
    }
    :hover {
      opacity: 0.8;
    }
  }
`

const StyledIcon = styled(Icon)<{ hasFeature: boolean }>`
  fill: ${(props) =>
    props.hasFeature ? props.theme.colors.text : props.theme.colors.secondary};
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

// Constants
const featureDropdownItems = [
  {
    label: "Open source",
    value: "Open source",
    filterKey: "open_source",
    category: "security",
    icon: <OpenSource />,
  },
  {
    label: "Self custody",
    value: "Self custody",
    filterKey: "non_custodial",
    category: "security",
    icon: <NonCustodial />,
  },
  {
    label: "Hardware wallet support",
    value: "Hardware wallet support",
    filterKey: "hardware_support",
    category: "feature",
    icon: <HardwareSupport />,
  },
  {
    label: "WalletConnect",
    value: "WalletConnect",
    filterKey: "walletconnect",
    category: "feature",
    icon: <WalletConnect />,
  },
  {
    label: "RPC importing",
    value: "RPC importing",
    filterKey: "rpc_importing",
    category: "feature",
    icon: <RPCImporting />,
  },
  {
    label: "NFT support",
    value: "NFT support",
    filterKey: "nft_support",
    category: "feature",
    icon: <NFTSupport />,
  },
  {
    label: "Connect to dapps",
    value: "Connect to dapps",
    filterKey: "connect_to_dapps",
    category: "feature",
    icon: <ConnectDapps />,
  },
  {
    label: "Staking",
    value: "Staking",
    filterKey: "staking",
    category: "feature",
    icon: <Staking />,
  },
  {
    label: "Swaps",
    value: "Swaps",
    filterKey: "swaps",
    category: "feature",
    icon: <Swap />,
  },
  {
    label: "Layer 2",
    value: "Layer 2",
    filterKey: "layer_2",
    category: "feature",
    icon: <Layer2 />,
  },
  {
    label: "Gas fee customization",
    value: "Gas fee customization",
    filterKey: "gas_fee_customization",
    category: "feature",
    icon: <GasFeeCustomization />,
  },
  {
    label: "ENS support",
    value: "ENS support",
    filterKey: "ens_support",
    category: "feature",
    icon: <ENSSupport />,
  },
  {
    label: "Token importing",
    value: "Token importing",
    filterKey: "erc_20_support",
    category: "feature",
    icon: <ERC20Support />,
  },
  {
    label: "EIP-1559 support",
    value: "EIP-1559 support",
    filterKey: "eip_1559_support",
    category: "feature",
    icon: <Eip1559 />,
  },
  {
    label: "Buy crypto",
    value: "Buy crypto",
    filterKey: "buy_crypto",
    category: "trade_and_buy",
    icon: <BuyCrypto />,
  },
  {
    label: "Withdraw crypto",
    value: "Withdraw crypto",
    filterKey: "withdraw_crypto",
    category: "trade_and_buy",
    icon: <WithdrawCrypto />,
  },
  {
    label: "Multisig",
    value: "Multisig",
    filterKey: "multisig",
    category: "smart_contract",
    icon: <Multisig />,
  },
  {
    label: "Social recovery",
    value: "Social recovery",
    filterKey: "social_recovery",
    category: "smart_contract",
    icon: <SocialRecover />,
  },
]

const WalletTable = ({ data, filters, walletData }) => {
  const [walletCardData, setWalletData] = useState(
    walletData.map((wallet) => {
      return { ...wallet, moreInfo: false }
    })
  )
  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    featureDropdownItems[1]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    featureDropdownItems[13]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    featureDropdownItems[9]
  )

  const updateMoreInfo = (idx) => {
    const temp = [...walletCardData]
    temp[idx].moreInfo = !temp[idx].moreInfo
    setWalletData(temp)
  }

  const filteredWallets = walletCardData.filter((wallet) => {
    let showWallet = true
    let mobileCheck = true
    let desktopCheck = true
    let browserCheck = true
    let hardwareCheck = true

    const featureFilterKeys = featureDropdownItems.map((item) => item.filterKey)
    const deviceFilters = Object.entries(filters).filter(
      (item) => !featureFilterKeys.includes(item[0])
    )
    const mobileFiltersTrue = deviceFilters
      .filter((item) => item[0] === "ios" || item[0] === "android")
      .filter((item) => item[1])
      .map((item) => item[0])
    const desktopFiltersTrue = deviceFilters
      .filter(
        (item) =>
          item[0] === "linux" || item[0] === "windows" || item[0] === "macOS"
      )
      .filter((item) => item[1])
      .map((item) => item[0])
    const browserFiltersTrue = deviceFilters
      .filter((item) => item[0] === "firefox" || item[0] === "chromium")
      .filter((item) => item[1])
      .map((item) => item[0])
    const hardwareFiltersTrue = deviceFilters
      .filter((item) => item[0] === "hardware")
      .filter((item) => item[1])
      .map((item) => item[0])

    for (let item of mobileFiltersTrue) {
      if (wallet[item]) {
        mobileCheck = true
        break
      } else {
        mobileCheck = false
      }
    }

    for (let item of desktopFiltersTrue) {
      if (wallet[item]) {
        desktopCheck = true
        break
      } else {
        desktopCheck = false
      }
    }

    for (let item of browserFiltersTrue) {
      if (wallet[item]) {
        browserCheck = true
        break
      } else {
        browserCheck = false
      }
    }

    for (let item of hardwareFiltersTrue) {
      if (wallet[item]) {
        hardwareCheck = true
        break
      } else {
        hardwareCheck = false
      }
    }

    featureFilterKeys.forEach((filter) => {
      if (filters[filter] && showWallet === true) {
        showWallet = filters[filter] === wallet[filter]
      }
    })

    return (
      mobileCheck && desktopCheck && browserCheck && hardwareCheck && showWallet
    )
  })

  const filteredFeatureDropdownItems = [...featureDropdownItems].filter(
    (item) => {
      return (
        item.label !== firstFeatureSelect.label &&
        item.label !== secondFeatureSelect.label &&
        item.label !== thirdFeatureSelect.label
      )
    }
  )

  return (
    <Container>
      <WalletContentHeader>
        <th>
          <p>
            <strong>Showing {filteredWallets.length} wallets</strong> out of{" "}
            {walletCardData.length}
          </p>
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: "Choose to compare",
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              setFirstFeatureSelect(selectedOption)
              trackCustomEvent({
                eventCategory: "WalletFeatureCompare",
                eventAction: `Select WalletFeatureCompare`,
                eventName: `${selectedOption.filterKey} selected`,
              })
            }}
            defaultValue={firstFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: "Choose to compare",
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              setSecondFeatureSelect(selectedOption)
              trackCustomEvent({
                eventCategory: "WalletFeatureCompare",
                eventAction: `Select WalletFeatureCompare`,
                eventName: `${selectedOption.filterKey} selected`,
              })
            }}
            defaultValue={secondFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: "Choose to compare",
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              setThirdFeatureSelect(selectedOption)
              trackCustomEvent({
                eventCategory: "WalletFeatureCompare",
                eventAction: `Select WalletFeatureCompare`,
                eventName: `${selectedOption.filterKey} selected`,
              })
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </th>
      </WalletContentHeader>
      {filteredWallets.map((wallet, idx) => {
        const deviceLabels: Array<string> = []

        wallet.ios && deviceLabels.push("iOS")
        wallet.android && deviceLabels.push("Android")
        wallet.linux && deviceLabels.push("Linux")
        wallet.windows && deviceLabels.push("Windows")
        wallet.macOS && deviceLabels.push("macOS")
        wallet.chromium && deviceLabels.push("Chromium")
        wallet.firefox && deviceLabels.push("Firefox")
        wallet.hardware && deviceLabels.push("Hardware")

        return (
          <WalletContainer>
            <Wallet>
              <td>
                <FlexInfo>
                  <div>
                    <Image
                      image={getImage(data[wallet.image_name])!}
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p>{wallet.name}</p>
                    <SecondaryText>{deviceLabels.join(" | ")}</SecondaryText>
                    {deviceLabels.map((label) => (
                      <SecondaryTextMobile>{label}</SecondaryTextMobile>
                    ))}
                    <SocialsContainer>
                      <Socials>
                        <Link
                          to={wallet.url}
                          hideArrow={true}
                          customEventOptions={{
                            eventCategory: "WalletExternalLinkList",
                            eventAction: `Go to wallet`,
                            eventName: `${wallet.name} ${idx}`,
                            eventValue: filters,
                          }}
                        >
                          <Icon name="webpage" size={"1.5rem"} color={true} />
                        </Link>
                        {wallet.twitter && (
                          <Link
                            to={wallet.twitter}
                            hideArrow={true}
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: filters,
                            }}
                          >
                            <Icon name="twitter" size={"1.5rem"} color={true} />
                          </Link>
                        )}
                        {wallet.discord && (
                          <Link
                            to={wallet.discord}
                            hideArrow={true}
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: filters,
                            }}
                          >
                            <Icon name="discord" size={"1.5rem"} color={true} />
                          </Link>
                        )}
                      </Socials>
                    </SocialsContainer>
                  </div>
                </FlexInfo>
              </td>
              <td>
                <FlexInfoCenter
                  onClick={() => {
                    updateMoreInfo(idx)
                    trackCustomEvent({
                      eventCategory: "WalletMoreInfo",
                      eventAction: `More info wallet`,
                      eventName: `More info ${wallet.name}`,
                    })
                  }}
                >
                  {wallet[firstFeatureSelect.filterKey!] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter
                  onClick={() => {
                    updateMoreInfo(idx)
                    trackCustomEvent({
                      eventCategory: "WalletMoreInfo",
                      eventAction: `More info wallet`,
                      eventName: `More info ${wallet.name}`,
                    })
                  }}
                >
                  {wallet[secondFeatureSelect.filterKey!] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter
                  onClick={() => {
                    updateMoreInfo(idx)
                    trackCustomEvent({
                      eventCategory: "WalletMoreInfo",
                      eventAction: `More info wallet`,
                      eventName: `More info ${wallet.name}`,
                    })
                  }}
                >
                  {wallet[thirdFeatureSelect.filterKey!] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      updateMoreInfo(idx)
                      trackCustomEvent({
                        eventCategory: "WalletMoreInfo",
                        eventAction: `More info wallet`,
                        eventName: `More info ${wallet.name}`,
                      })
                    }}
                  >
                    <WalletMoreInfoArrow
                      name={wallet.moreInfo ? "chevronUp" : "chevronDown"}
                    />
                  </div>
                </FlexInfoCenter>
              </td>
            </Wallet>
            {wallet.moreInfo && (
              <div>
                <WalletMoreInfoContainer>
                  <div>
                    <ColoredLine color={wallet.brand_color} />
                  </div>
                  <div>
                    <WalletMoreInfoCategory>
                      <h4>Features</h4>
                      <Features>
                        {featureDropdownItems.map((feature) => {
                          if (feature.category === "feature")
                            return (
                              <FeatureLabel
                                hasFeature={wallet[feature.filterKey!]}
                              >
                                <FeatureIcon
                                  hasFeature={wallet[feature.filterKey!]}
                                >
                                  {feature.icon}
                                </FeatureIcon>
                                <p>{feature.label}</p>
                                <Tooltip
                                  content={
                                    <p>
                                      {
                                        walletFilterData[feature.filterKey]
                                          .description
                                      }
                                    </p>
                                  }
                                >
                                  <StyledIcon
                                    name="info"
                                    hasFeature={wallet[feature.filterKey!]}
                                  />
                                </Tooltip>
                              </FeatureLabel>
                            )
                        })}
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Security</h4>
                      <Features>
                        {featureDropdownItems.map((feature) => {
                          if (feature.category === "security")
                            return (
                              <FeatureLabel
                                hasFeature={wallet[feature.filterKey!]}
                              >
                                <FeatureIcon
                                  hasFeature={wallet[feature.filterKey!]}
                                >
                                  {feature.icon}
                                </FeatureIcon>
                                <p>{feature.label}</p>
                                <Tooltip
                                  content={
                                    <p>
                                      {
                                        walletFilterData[feature.filterKey]
                                          .description
                                      }
                                    </p>
                                  }
                                >
                                  <StyledIcon
                                    name="info"
                                    hasFeature={wallet[feature.filterKey!]}
                                  />
                                </Tooltip>
                              </FeatureLabel>
                            )
                        })}
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Trade & buy</h4>
                      <Features>
                        {featureDropdownItems.map((feature) => {
                          if (feature.category === "trade_and_buy")
                            return (
                              <FeatureLabel
                                hasFeature={wallet[feature.filterKey!]}
                              >
                                <FeatureIcon
                                  hasFeature={wallet[feature.filterKey!]}
                                >
                                  {feature.icon}
                                </FeatureIcon>
                                <p>{feature.label}</p>
                                <Tooltip
                                  content={
                                    <p>
                                      {
                                        walletFilterData[feature.filterKey]
                                          .description
                                      }
                                    </p>
                                  }
                                >
                                  <StyledIcon
                                    name="info"
                                    hasFeature={wallet[feature.filterKey!]}
                                  />
                                </Tooltip>
                              </FeatureLabel>
                            )
                        })}
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Smart contract</h4>
                      <Features>
                        {featureDropdownItems.map((feature) => {
                          if (feature.category === "smart_contract")
                            return (
                              <FeatureLabel
                                hasFeature={wallet[feature.filterKey!]}
                              >
                                <FeatureIcon
                                  hasFeature={wallet[feature.filterKey!]}
                                >
                                  {feature.icon}
                                </FeatureIcon>
                                <p>{feature.label}</p>
                                <Tooltip
                                  content={
                                    <p>
                                      {
                                        walletFilterData[feature.filterKey]
                                          .description
                                      }
                                    </p>
                                  }
                                >
                                  <StyledIcon
                                    name="info"
                                    hasFeature={wallet[feature.filterKey!]}
                                  />
                                </Tooltip>
                              </FeatureLabel>
                            )
                        })}
                      </Features>
                    </WalletMoreInfoCategory>
                    <LastUpdated>
                      <i>
                        {wallet.name} info updated on {wallet.last_updated}
                      </i>
                      <Link
                        to={wallet.url}
                        customEventOptions={{
                          eventCategory: "WalletExternalLinkList",
                          eventAction: `Go to wallet`,
                          eventName: `${wallet.name} ${idx}`,
                          eventValue: filters,
                        }}
                      >
                        Check out {wallet.name}
                      </Link>
                    </LastUpdated>
                  </div>
                </WalletMoreInfoContainer>
              </div>
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
