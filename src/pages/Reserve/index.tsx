import React from "react";
import { useNom } from "hooks/useNom";
import { useParams, useHistory } from "react-router-dom";
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
import { BlockText } from "components/BlockText";
import { NOM_FEE } from "config";
import { CaretLeft, ArrowDown } from "phosphor-react";
import { SearchBar } from "components/SearchBar";
import { YEAR_IN_SECONDS, ZERO_ADDRESS } from "utils/constants";
import { useUSD } from "hooks/useUSD";
import { useReserve } from "hooks/useReserve";
import { formatName } from "utils/name";
import { formatUnits } from "ethers/lib/utils";
import { BlockscoutAddressLink } from "components/BlockscoutAddressLink";
import { shortenAddress } from "utils/address";
import { useContractKit } from "@celo-tools/use-contractkit";
import { normalize } from "eth-ens-namehash";

export const Reserve: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);
  const { address } = useContractKit();

  const [nom, refetchNom] = useNom(nameFormatted);
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState("5");
  const [usd, refetchUSD] = useUSD();
  const history = useHistory();
  const { approve, reserve, loading } = useReserve(name);

  let isNormal = false;
  try {
    isNormal = !!normalize(name);
  } catch (e) {}

  if (nom == null) {
    return <Spinner />;
  }

  const approveButton = (
    <Button onClick={() => approve().then(refetchUSD)}>Approve</Button>
  );

  const reserveButton = (
    <Button onClick={() => reserve(years).then(refetchUSD).then(refetchNom)}>
      Reserve
    </Button>
  );

  let button = approveButton;
  if (usd) {
    const fmtCost = Number(cost === "" ? "0" : cost);
    if (Number(formatUnits(usd.balance, usd.decimals)) < fmtCost) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    } else if (Number(formatUnits(usd.allowance, usd.decimals)) >= fmtCost) {
      button = reserveButton;
    }
  }

  return (
    <Flex sx={{ alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ width: "100%", maxWidth: "800px" }} mb={4}>
        <SearchBar size="small" />
      </Box>
      <Card sx={{ width: "100%", maxWidth: "800px" }} py={4} px={3}>
        <Flex
          onClick={() => history.goBack()}
          sx={{ alignItems: "center", cursor: "pointer" }}
          mb={4}
        >
          <CaretLeft size={28} />
          <Text>Back</Text>
        </Flex>
        <Flex mb={4}>
          <Heading as="h2">
            Reserve <Text color="primaryTextColor">{name}.nom</Text>
          </Heading>
        </Flex>
        <Text variant="form">Years to reserve</Text>
        <Flex sx={{ alignItems: "center" }}>
          <Input
            type="number"
            value={years}
            onChange={(e) => {
              const years = e.target.value;
              if (isNaN(Number(years))) return;
              setYears(Number(years));
              setCost((Number(years) * YEAR_IN_SECONDS * NOM_FEE).toString());
            }}
            mr={2}
          />
          <Text>year(s)</Text>
        </Flex>
        <Flex mt={2} sx={{ justifyContent: "center" }}>
          <ArrowDown size={32} />
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          <Box sx={{ width: "100%" }} mr={2}>
            <Flex sx={{ justifyContent: "space-between", mb: 1 }}>
              <Text variant="form">Cost</Text>
              <Text
                sx={{ color: "primaryTextColor", cursor: "pointer" }}
                variant="form"
                onClick={() => {
                  if (usd) {
                    const cost = formatUnits(usd.balance, usd.decimals);
                    setCost(cost);
                    setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
                  }
                }}
              >
                max: {usd ? formatUnits(usd.balance, usd.decimals) : "0"}
              </Text>
            </Flex>
            <Input
              sx={{ width: "100%" }}
              value={cost}
              onChange={(e) => {
                const cost = e.target.value;
                setCost(cost);
                setYears(Number(cost) / YEAR_IN_SECONDS / NOM_FEE);
              }}
            />
          </Box>
          <Text mt={3}>USD</Text>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {isNormal ? (
            loading ? (
              <Spinner />
            ) : nom.owner === ZERO_ADDRESS ? (
              button
            ) : nom.owner === address ? (
              <BlockText>You own this name!</BlockText>
            ) : (
              <BlockText>
                Name has already been reserved by{" "}
                <BlockscoutAddressLink address={nom.owner}>
                  {shortenAddress(nom.owner)}
                </BlockscoutAddressLink>
              </BlockText>
            )
          ) : (
            <BlockText>
              This name is invalid and not available for reservation.
            </BlockText>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
