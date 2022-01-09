import React from "react";
import { useNom } from "src/hooks/useNom";
import { useContractKit } from "@celo-tools/use-contractkit";
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
import { ethers } from "ethers";
import { BlockText } from "src/components/BlockText";
import NomMetadata from "src/abis/nomspace/Nom.json";
import { Nom } from "src/generated/Nom";
import { DEFAULT_GAS_PRICE, FEE_MODULE_V1, NOM } from "src/config";
import { AbiItem, toBN, toWei, fromWei } from "web3-utils";
import { toastTx } from "src/utils/toastTx";
import { toast } from "react-toastify";
import { CaretLeft, ArrowDown } from "phosphor-react";
import { SearchBar } from "src/components/SearchBar";
import { YEAR_IN_SECONDS, ZERO_ADDRESS } from "src/constants";
import { useCUSD } from "src/hooks/useCUSD";
import { StableToken } from "@celo/contractkit";
import { useNomFee } from "src/hooks/useNomFee";
import { formatName } from "src/utils/name";
import { normalize } from "eth-ens-namehash";

export const Reserve: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { getConnectedKit, network } = useContractKit();
  const [nom, refetchNom] = useNom(nameFormatted);
  const [years, setYears] = React.useState(1);
  const [cost, setCost] = React.useState(5);
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [reserveLoading, setReserveLoading] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [cUSD, refetchCUSD] = useCUSD();
  const [nomFee] = useNomFee();
  const history = useHistory();

  let isNormal = false;
  try {
    isNormal = !!normalize(name);
  } catch (e) {}

  if (nom == null) {
    return <Spinner />;
  }

  const approveButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        try {
          setApproveLoading(true);
          const cUSD = await kit._web3Contracts.getStableToken(
            StableToken.cUSD
          );
          const tx = await cUSD.methods
            .approve(FEE_MODULE_V1, toWei((cost + 1).toFixed(18)))
            .send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
          refetchCUSD();
          setApproved(true);
        } catch (e) {
          toast(e.message);
        } finally {
          setApproveLoading(false);
        }
      }}
    >
      Approve
    </Button>
  );

  const reserveButton = (
    <Button
      onClick={async () => {
        const kit = await getConnectedKit();
        // kit is connected to a wallet
        const nom = new kit.web3.eth.Contract(
          NomMetadata.abi as AbiItem[],
          NOM[network.chainId]
        ) as unknown as Nom;

        try {
          setReserveLoading(true);
          const tx = await nom.methods
            .reserve(
              ethers.utils.formatBytes32String(nameFormatted),
              Math.floor(Number(years) * YEAR_IN_SECONDS)
            )
            .send({
              from: kit.defaultAccount,
              gasPrice: DEFAULT_GAS_PRICE,
            });
          toastTx(tx.transactionHash);
          refetchNom();
          setApproved(false);
        } catch (e) {
          toast(e.message);
        } finally {
          setReserveLoading(false);
        }
      }}
    >
      Reserve
    </Button>
  );

  const loading = approveLoading || reserveLoading;
  let button = approveButton;
  if (cUSD) {
    const costBN = toBN(toWei(cost.toFixed(18)));
    if (cUSD.balance.lt(costBN)) {
      button = <Button disabled={true}>Insufficient funds</Button>;
    } else if (approved) {
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
          <Heading as="h2" mr={2}>
            Reserve
          </Heading>
          <Heading color="primaryText">{name}.nom</Heading>
        </Flex>
        <Text variant="form">Years to reserve</Text>
        <Flex sx={{ alignItems: "center" }}>
          <Input
            type="number"
            value={years}
            onChange={(e) => {
              const years = Number(e.target.value);
              if (isNaN(years)) return;
              setYears(years);
              setCost(
                Number(years) * YEAR_IN_SECONDS * Number(fromWei(nomFee))
              );
            }}
            mr={2}
          />
          <Text>year(s)</Text>
        </Flex>
        <Box mt={2} sx={{ textAlign: "center" }}>
          <ArrowDown size={32} />
        </Box>
        <Flex sx={{ alignItems: "center" }}>
          <Box sx={{ width: "100%" }} mr={2}>
            <Flex sx={{ justifyContent: "space-between", mb: 1 }}>
              <Text variant="form">Cost</Text>
              <Text
                sx={{ color: "primaryText", cursor: "pointer" }}
                variant="form"
                onClick={() => {
                  if (cUSD) {
                    const cost = Number(fromWei(cUSD.balance));
                    setCost(cost);
                    setYears(cost / YEAR_IN_SECONDS / Number(fromWei(nomFee)));
                  }
                }}
              >
                max: {cUSD ? Number(fromWei(cUSD.balance)).toFixed(4) : "0"}
              </Text>
            </Flex>
            <Input
              sx={{ width: "100%" }}
              value={cost}
              onChange={(e) => {
                const cost = Number(e.target.value);
                if (isNaN(cost)) {
                  return;
                }
                setCost(cost);
                setYears(
                  Number(cost) / YEAR_IN_SECONDS / Number(fromWei(nomFee))
                );
              }}
            />
          </Box>
          <Text mt={3}>cUSD</Text>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {isNormal ? (
            nom.owner === ZERO_ADDRESS ? (
              loading ? (
                <Spinner />
              ) : (
                button
              )
            ) : (
              <BlockText>Name has already been reserved.</BlockText>
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
