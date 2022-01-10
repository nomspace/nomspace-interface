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
  onClose: () => void;
  name: string;
}

export const ExtendView: React.FC<Props> = ({ onClose, name }) => {
  const { address } = useContractKit();

  const [nom] = GlobalNom.useContainer();
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState(name.length <= 3 ? 20 : 5);
  const [usd, refetchUSD] = useUSD();
  const [tokens] = useTokens();
  const { approve, extend, loading } = useReserve(name);

  if (nom == null) {
    return <Spinner />;
  }

  const confirmButton = (
    <Button
      variant="modal.form.submit"
      onClick={async () => {
        await approve(cost);
        await extend(years);
        refetchUSD();
        onClose();
      }}
    >
      CONFIRM
    </Button>
  );

  let button = confirmButton;
  if (usd) {
    if (Number(formatUnits(usd.balance, usd.decimals)) < cost) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    }
  }
  if (!name) return <Text>Invalid name</Text>;
  return (
    <>
      <Text variant="modal.title">
        Extend{" "}
        <Text variant="modal.title" color="primaryTextColor">
          {name}.nom
        </Text>
      </Text>
      <Flex variant="modal.container">
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
              {tokens?.find((t) => t.address === usd?.address)?.symbol}
            </Text>
          </Flex>
          {loading ? (
            <Spinner />
          ) : nom.owner === address ? (
            button
          ) : (
            <Text>
              Name has already been reserved by{" "}
              <BlockscoutAddressLink address={nom.owner}>
                {shortenAddress(nom.owner)}
              </BlockscoutAddressLink>
            </Text>
          )}
        </Box>
      </Flex>
    </>
  );
};
