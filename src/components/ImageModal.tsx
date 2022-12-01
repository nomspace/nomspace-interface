import Modal from "react-modal";

interface IProps {
  src: string | undefined;
  setSrc: (src: string | undefined) => void;
}

export const ImageModal: React.FC<IProps> = ({ src, setSrc }) => {
  return (
    <Modal
      isOpen={src !== undefined}
      onRequestClose={() => setSrc(undefined)}
      style={{
        content: {
          borderRadius: "6px",
          position: "absolute",
          backgroundColor: "var(--theme-ui-colors-background)",
          width: "fit-content",
          height: "fit-content",
          top: "calc(50% - 200px)",
          left: "calc(50% - 200px)",
          margin: 0,
          padding: 0,
        },
      }}
    >
      <img
        style={{ width: "508px", height: "508px", verticalAlign: "bottom" }}
        src={src!}
        alt="NFT"
      />
    </Modal>
  );
};
