import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
} from "theme-ui";
import { BlockText } from "src/components/BlockText";
import { toWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { CaretLeft } from "phosphor-react";
import { SearchBar } from "src/components/SearchBar";
import { ZERO_ADDRESS } from "src/constants";
import { StableToken } from "@celo/contractkit";
import { formatName } from "src/utils/name";
import { Page } from "src/state/global";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Request: React.FC = () => {
  const query = useQuery();
  const amount = query.get("amount");
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { getConnectedKit } = useContractKit();
  const [nom] = useNom(nameFormatted);
  const [fulfillLoading, setFulfillLoading] = React.useState(false);
  const history = useHistory();
  const sendCUSD = React.useCallback(
    async (amount: string) => {
      const kit = await getConnectedKit();
      if (!kit || !nom) {
        return;
      }
      const cUSD = await kit.contracts.getStableToken(StableToken.cUSD);
      const tx = await cUSD
        .transfer(nom.resolution, toWei(amount))
        .send({ from: kit.defaultAccount, gasPrice: toWei("0.5", "gwei") });
      toastTx(await tx.getHash());
      history.push(`/${Page.SEARCH}/${name}`);
    },
    [getConnectedKit, history, name, nom]
  );

  if (nom == null) {
    return <Spinner />;
  }

  if (amount == null) {
    return (
      <Text>
        Invalid request amount.{" "}
        <Link style={{ textDecoration: "none" }} to="/">
          <Text sx={{ color: "primary" }}>Return home</Text>
        </Link>
      </Text>
    );
  }

  const button = (
    <Button
      onClick={async () => {
        setFulfillLoading(true);
        await sendCUSD(amount).finally(() => setFulfillLoading(false));
      }}
    >
      Fulfill
    </Button>
  );

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ width: "100%", maxWidth: "800px" }} mb={4}>
        <SearchBar size="small" />
      </Box>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex
          onClick={() => history.push(`/${Page.SEARCH}/${name}`)}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex mb={4}>
          <Heading as="h2" mr={2}>
            Fulfill request for
          </Heading>
          <Heading color="primaryText">{name}.nom</Heading>
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          <Box sx={{ width: "100%" }} mr={2}>
            <Flex sx={{ justifyContent: "space-between", mb: 1 }}>
              <Text variant="form">Amount</Text>
            </Flex>
            <Input sx={{ width: "100%" }} value={amount} readOnly />
          </Box>
          <Text mt={3}>cUSD</Text>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {nom.owner !== ZERO_ADDRESS ? (
            fulfillLoading ? (
              <Spinner />
            ) : (
              button
            )
          ) : (
            <BlockText>Name is not reserved.</BlockText>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
