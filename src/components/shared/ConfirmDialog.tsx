import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

interface IConfirmDialogProps {
    show: boolean;
    message: string;
    confirmClick: () => void;
    closeClick: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = (props) => {
    const { show, message, confirmClick, closeClick } = props;
    const footer = (
        <React.Fragment>
            <Button
                label="No"
                size="small"
                icon="pi pi-times"
                outlined
                onClick={closeClick}
            />
            <Button
                label="Yes"
                size="small"
                icon="pi pi-check"
                severity="danger"
                onClick={confirmClick}
            />
        </React.Fragment>
    );

    return (
        <Dialog
            visible={show}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={footer}
            onHide={closeClick}
        >
            <div className="confirmation-content">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "1rem" }}
                />
                <span>{message}</span>
            </div>
        </Dialog>
    );
};

export default ConfirmDialog;
