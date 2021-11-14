import { useState, useContext } from "react";
import ThemeContext from "../../../../Context/ContextStates";
import { BsCloudArrowDown, BsCloudArrowUp } from "react-icons/bs";
import FAmodal from "../../../../Modals/DownloadOrSaveModal/FAmodal";
import DfaSaveModal from "../../../../Modals/DownloadOrSaveModal/DfaSaveModal";
/*
 *
 * Description:
 * this component allows the user to download of save an automata
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const DownloadOrSave = ({
  setCurrentDfa,
  displayMessage,
  currentDfaId,
  addingTr,
}) => {
  const { nodes } = useContext(ThemeContext);
  const [showDfaDownload, setShowDfaDownload] = useState(false);
  const handleCloseDfaDownload = () => setShowDfaDownload(false);

  //DFA save modals
  const [showSaveModal, setShowSaveModal] = useState(false);
  const handleCloseSaveModal = () => setShowSaveModal(false);

  return (
    <>
      <BsCloudArrowDown
        onClick={() => setShowDfaDownload(true)}
        title="Click here to download a DFA from the database"
        className="downloadFa"
        size={23}
      />
      {!currentDfaId && (
        <BsCloudArrowUp
          onClick={() =>
            nodes.length === 0
              ? displayMessage(
                  "light",
                  "No data",
                  "Theres nothing to be saved!"
                )
              : setShowSaveModal(true)
          }
          title="Click here to save this DFA to the database"
          className="saveFa"
          size={23}
        />
      )}
      {showDfaDownload && (
        <FAmodal
          show={showDfaDownload}
          handleClose={handleCloseDfaDownload}
          setCurrentDfa={setCurrentDfa}
          currentDfaId={currentDfaId}
        />
      )}
      {showSaveModal && (
        <DfaSaveModal
          show={showSaveModal}
          addingTr={addingTr}
          handleClose={handleCloseSaveModal}
        />
      )}
    </>
  );
};

export default DownloadOrSave;
