import React from "react";
import { useNom } from "hooks/useNom";
import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from "@celo-tools/use-contractkit";
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
import { BlockText } from "components/BlockText";
import { ReservePortal } from "generated/ReservePortal";
import { USD, NOM, RESERVE_PORTAL, NOM_FEE } from "config";
import { toastTx } from "utils/toastTx";
import { toast } from "react-toastify";
import { CaretLeft, ArrowDown } from "phosphor-react";
import { SearchBar } from "components/SearchBar";
import { YEAR_IN_SECONDS, ZERO_ADDRESS } from "utils/constants";
import { useUSD } from "hooks/useUSD";
import { MaxUint256 } from "@ethersproject/constants";
import { formatName } from "utils/name";
import {
  ERC20__factory,
  OperatorOwnedNomV1__factory,
  ReservePortal__factory,
} from "generated";
import { formatUnits } from "ethers/lib/utils";

export const Reserve: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const nameFormatted = formatName(name);

  const { address, network } = useContractKit();
  const getConnectedSigner = useGetConnectedSigner();
  const provider = useProvider();
  const [nom, refetchNom] = useNom(nameFormatted);
  const [years, setYears] = React.useState("1");
  const [cost, setCost] = React.useState("5");
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [reserveLoading, setReserveLoading] = React.useState(false);
  const [usd, refetchUSD] = useUSD();
  const history = useHistory();

  if (nom == null) {
    return <Spinner />;
  }

  const approveButton = (
    <Button
      onClick={async () => {
        const reservePortalAddress = RESERVE_PORTAL[network.chainId];
        const usdAddress = USD[network.chainId];
        if (!reservePortalAddress || !usdAddress) {
          return;
        }
        const signer = await getConnectedSigner();
        try {
          setApproveLoading(true);
          const usd = ERC20__factory.connect(usdAddress, signer);
          const gasPrice = await provider.getGasPrice();
          const tx = await usd.approve(
            reservePortalAddress,
            MaxUint256.toString(), // TODO: don't do max
            { gasPrice }
          );
          toastTx(tx.hash);
          refetchUSD();
        } catch (e: any) {
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
        const usdAddress = USD[network.chainId];
        const nomAddress = NOM[network.chainId];
        const reservePortalAddress = RESERVE_PORTAL[network.chainId];
        if (!usdAddress || !nomAddress || !reservePortalAddress || !address) {
          return;
        }
        const signer = await getConnectedSigner();
        const usd = ERC20__factory.connect(usdAddress, signer);
        const nom = OperatorOwnedNomV1__factory.connect(nomAddress, signer);
        const reservePortal = ReservePortal__factory.connect(
          reservePortalAddress,
          signer
        ) as unknown as ReservePortal;

        try {
          setReserveLoading(true);
          const { data } = await nom.populateTransaction.mintIn(
            ethers.utils.formatBytes32String(nameFormatted),
            Math.floor(Number(years) * YEAR_IN_SECONDS),
            address
          );
          if (!data) return;
          const gasPrice = await provider.getGasPrice();
          // Reserve with 1 unit
          const tx = await reservePortal.escrow(
            usd.address,
            formatUnits(1, await usd.decimals()).toString(),
            44787,
            nomAddress,
            0,
            data,
            address,
            {
              gasPrice,
            }
          );
          toastTx(tx.hash);
          refetchNom();
        } catch (e: any) {
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
              setYears(years);
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
                    setYears(
                      (Number(cost) / YEAR_IN_SECONDS / NOM_FEE).toString()
                    );
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
                setYears((Number(cost) / YEAR_IN_SECONDS / NOM_FEE).toString());
              }}
            />
          </Box>
          <Text mt={3}>USD</Text>
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: 6 }}>
          {nom.owner === ZERO_ADDRESS ? (
            loading ? (
              <Spinner />
            ) : (
              button
            )
          ) : (
            <BlockText>Name has already been reserved.</BlockText>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
