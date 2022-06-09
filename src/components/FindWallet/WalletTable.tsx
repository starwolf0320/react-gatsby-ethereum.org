// Libraries
import React, { useState } from "react"
import styled from "styled-components"

// Components
import { StyledSelect as Select } from "../SharedStyledComponents"

// Styles
const Container = styled.div`
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% auto auto auto 5%;
  width: 100%;
`

const WalletContentHeader = styled(Grid)`
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 76px;
  padding-top: 8px;
  background: ${(props) => props.theme.colors.background};

  span {
    color: ${(props) => props.theme.colors.primary};
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  .react-select__control {
    border: none;
    background: none;

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.primary};
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

    &:hover {
      background: ${(props) => props.theme.colors.primary};
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
        }
      }
    }
  }

  .react-select__control--is-focused {
    border: none;
    background: ${(props) => props.theme.colors.primary};

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.text};
      }
    }

    .react-select__indicators {
      background: ${(props) => props.theme.colors.primary};
      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.text};
        }
      }

      .react-select__indicators {
        .react-select__indicator {
          color: ${(props) => props.theme.colors.text};
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 14px 0;
    }
  }
`

const Wallet = styled(Grid)``

// Constants
const featureDropdownItems = [
  {
    label: "Open source",
    value: "Open source",
    filterKey: "open_source",
  },
  {
    label: "Self custody",
    value: "Self custody",
    filterKey: "non_custodial",
  },
  {
    label: "Hardware wallet support",
    value: "Hardware wallet support",
    filterKey: "hardware_support",
  },
  {
    label: "WalletConnect",
    value: "WalletConnect",
    filterKey: "walletconnect",
  },
  {
    label: "RPC importing",
    value: "RPC importing",
    filterKey: "rpc_importing",
  },
  {
    label: "NFT support",
    value: "NFT support",
    filterKey: "nft_support",
  },
  {
    label: "Connect to dapps",
    value: "Connect to dapps",
    filterKey: "connect_to_dapps",
  },
  {
    label: "Staking",
    value: "Staking",
    filterKey: "staking",
  },
  {
    label: "Swaps",
    value: "Swaps",
    filterKey: "swaps",
  },
  {
    label: "Layer 2",
    value: "Layer 2",
    filterKey: "layer_2",
  },
  {
    label: "Gas fee customization",
    value: "Gas fee customization",
    filterKey: "gas_fee_customization",
  },
  {
    label: "ENS support",
    value: "ENS support",
    filterKey: "ens_support",
  },
  {
    label: "Buy crypto",
    value: "Buy crypto",
    filterKey: "buy_crypto",
  },
  {
    label: "Token importing",
    value: "Token importing",
    filterKey: "erc_20_support",
  },
  {
    label: "Buy crypto",
    value: "Buy crypto",
    filterKey: "buy_crypto",
  },
  {
    label: "Withdraw crypto",
    value: "Withdraw crypto",
    filterKey: "withdraw_crypto",
  },
  {
    label: "Multisig",
    value: "Multisig",
    filterKey: "multisig",
  },
  {
    label: "Social recovery",
    value: "Social recovery",
    filterKey: "social_recovery",
  },
]

const WalletTable = ({ data, walletData }) => {
  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    featureDropdownItems[0]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    featureDropdownItems[1]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    featureDropdownItems[2]
  )

  return (
    <Container>
      {/* TODO: Change this span info for fitlered wallets when implemented */}
      <WalletContentHeader>
        <p>
          <span>{walletData.length} wallets</span> out of {walletData.length}
        </p>
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setFirstFeatureSelect(selectedOption)
          }}
          defaultValue={firstFeatureSelect}
        />
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setSecondFeatureSelect(selectedOption)
          }}
          defaultValue={secondFeatureSelect}
        />
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setThirdFeatureSelect(selectedOption)
          }}
          defaultValue={thirdFeatureSelect}
        />
      </WalletContentHeader>
      {walletData.map((wallet) => {
        console.log(wallet)
        return (
          <Wallet>
            <div>
              <p>{wallet.name}</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </Wallet>
        )
      })}
    </Container>
  )
}

export default WalletTable
