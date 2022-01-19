import React from "react";
import { GlobalNom } from "hooks/useNom";
import { Box, Button, Flex, Input, Spinner, Text } from "theme-ui";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatUnits } from "ethers/lib/utils";
import { useTokens } from "hooks/useTokens";
import { getNomCost, getNomYears } from "utils/cost";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { shortenAddress } from "utils/address";

interface Props {
  name: string;
}

export const ReserveView: React.FC<Props> = ({ name }) => {
  const { address } = useContractKit();

  const [nom] = GlobalNom.useContainer();
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState(name.length <= 3 ? 20 : 5);
  const [usd, refetchUSD] = useUSD();
  const [tokens] = useTokens();
  const { reserve, loading } = useReserve(name);

  if (nom == null) {
    return <Spinner />;
  }

  const confirmButton = (
    <>
      <Button
        variant="modal.form.submit"
        onClick={async () => {
          await reserve(years);
          refetchUSD();
        }}
        disabled={true}
      >
        Confirm
      </Button>
      <Text mt={4}>Reserving is disabled while in beta.</Text>
    </>
  );

  let button = confirmButton;
  if (usd) {
    if (Number(formatUnits(usd.balance, usd.decimals)) < cost) {
      button = (
        <Button variant="modal.form.submit" disabled={true}>
          Insufficient funds
        </Button>
      );
    }
  }
  if (!name) return <Text>Invalid name</Text>;
  return (
    <Flex variant="modal.container">
      <Text variant="modal.title">
        Reserve{" "}
        <Text variant="modal.title" color="primaryTextColor">
          {name}.nom
        </Text>
      </Text>
      <Box variant="modal.form.container">
        <Flex
          variant="modal.form.durationWrapper"
          sx={{ alignItems: "center" }}
        >
          <Input
            variant="modal.form.input"
            type="number"
            value={years}
            onChange={(e) => {
              const years = Number(e.target.value);
              if (isNaN(years)) return;
              setYears(years);
              setCost(getNomCost(name, years));
            }}
            mr={2}
          />
          <Text sx={{ ml: 8 }}>year(s)</Text>
        </Flex>
        <Flex sx={{ justifyContent: "flex-end", width: "100%", mr: 120 }}>
          <Text
            sx={{ color: "primaryTextColor", cursor: "pointer" }}
            variant="form"
            onClick={() => {
              if (usd) {
                const cost = Number(formatUnits(usd.balance, usd.decimals));
                setCost(cost);
                setYears(getNomYears(name, cost));
              }
            }}
          >
            max:{" "}
            {usd
              ? Number(formatUnits(usd.balance, usd.decimals)).toFixed(4)
              : "0"}
          </Text>
        </Flex>
        <Flex
          variant="modal.form.totalCostWrapper"
          sx={{ alignItems: "center" }}
        >
          <Input
            variant="modal.form.input"
            type="number"
            value={cost}
            onChange={(e) => {
              const cost = Number(e.target.value);
              if (isNaN(cost)) return;
              setCost(cost);
              setYears(getNomYears(name, cost));
            }}
          />
          <Text sx={{ ml: 8 }}>
            {tokens?.find((t) => t.address === usd?.address)?.symbol ?? "USD"}
          </Text>
        </Flex>
        {loading ? (
          <Spinner />
        ) : nom.owner == null ? (
          button
        ) : nom.owner === address ? (
          <Text>You own this name!</Text>
        ) : (
          nom.owner && (
            <Text>
              Name has already been reserved by{" "}
              <BlockscoutAddressLink address={nom.owner}>
                {shortenAddress(nom.owner)}
              </BlockscoutAddressLink>
            </Text>
          )
        )}
      </Box>
    </Flex>
  );
};
