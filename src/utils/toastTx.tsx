import { toast } from "react-toastify";
import { Text } from "theme-ui";
import { BlockscoutTxLink } from "components/BlockscoutTxLink";
import * as Sentry from "@sentry/browser";

export const toastTx = (tx: string) => {
  toast(
    <>
      <Text>Transaction completed! </Text>
      <BlockscoutTxLink tx={tx}>View on Blockscout</BlockscoutTxLink>
    </>
  );
  toast(
    <>
      <Text>
        Be patient with us! Changes can take several seconds to finalize.
      </Text>
    </>
  );
};

export const toastError = (error: Error) => {
  toast(error.message);
  Sentry.captureException(error);
};
