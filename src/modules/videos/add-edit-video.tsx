import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import {
    Dropdown,
    DropdownChangeEvent,
} from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';
import { classNames } from "primereact/utils";
import { Author, Category, Video } from "../../common/interfaces";
import { AppContext } from "../../context/context";
import { formatDateToYYYYMMDD } from "../../utilities/utils";

interface IAddEditVideo {
    show: boolean;
    isAdd: boolean;
    video: Video | null;
    authors: Author[];
    saveVideo: (data: Video) => void;
    closeClick: () => void;
}

const videoInitialData: Video = {
    id: -1,
    name: "",
    catIds: [],
    formats: {
        one: { res: "1080p", size: 1000 }
    },
    authorId: -1,
    releaseDate: formatDateToYYYYMMDD(new Date())

};

const AddEditVideo: React.FC<IAddEditVideo> = ({ show, isAdd, closeClick, video, saveVideo, authors }) => {
    const { state } = useContext(AppContext);

    const [submitted, setSubmitted] = useState(false);
    const [videoForm, setVideoForm] = useState<Video>(
        video || videoInitialData
    );
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const authorsOptions: Author[] = authors;
    const categoryOptions: Category[] = state.categories;

    useEffect(() => {
        console.log(JSON.stringify(state.categories));
        setSelectedCategories(state.categories.filter((obj) => video?.catIds.includes(obj.id)));
        setSelectedAuthor(authors.find((author: Author) => author.id === video?.authorId) as Author);
    }, [])


    const setFormValue = (value: string | number | number[], name: string) => {
        let videoTemp: Video = { ...videoForm };
        (videoTemp as any)[`${name}`] = value;
        setVideoForm(videoTemp);
    };

    const onInputChange = (
        e: ChangeEvent<HTMLInputElement> | RadioButtonChangeEvent,
        name: string
    ) => {
        setFormValue((e.target && e.target.value) || "", name);
    };

    const formValidation = Boolean(!videoForm.name || videoForm.authorId === -1 || videoForm.catIds.length === 0);

    const submitVideoForm = () => {
        setSubmitted(true);
        if (!formValidation) {
            saveVideo(videoForm);
        }
    };

    const footer = (
        <React.Fragment>
            <Button
                label="Cancel"
                size="small"
                icon="pi pi-times"
                outlined
                onClick={closeClick}
            />
            <Button
                disabled={formValidation}
                label={isAdd ? "Create" : "Update"}
                size="small"
                icon="pi pi-check"
                severity="success"
                onClick={submitVideoForm}
            />
        </React.Fragment>
    );

    const authorChange = (e: DropdownChangeEvent) => {
        const val = (e.target && e.target.value) || "";
        setFormValue(val ? val.id : -1, "authorId");
        setSelectedAuthor(val);
    };

    const categoryChange = (value: Category[]) => {
        setSelectedCategories(value);
        setFormValue(value.map(item => item.id), "catIds");
    };

    return (
        <Dialog
            visible={show}
            style={{ width: "30rem" }}
            breakpoints={{ "960px": "30vw", "641px": "40vw" }}
            header={isAdd ? "Create video" : "Update video"}
            modal
            className="p-fluid"
            footer={footer}
            onHide={closeClick}
        >
            <div className="field">
                <label htmlFor="name" className="font-bold">
                    Name*
                </label>
                <InputText
                    id="name"
                    value={videoForm.name}
                    onChange={(e) => onInputChange(e, "name")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !videoForm["name"],
                    })}
                />
                {submitted && !videoForm["name"] && (
                    <small className="p-error">Name is required.</small>
                )}
            </div>
            <div className="field">
                <label htmlFor="country" className="font-bold">
                    Author*
                </label>
                <Dropdown
                    value={selectedAuthor}
                    onChange={authorChange}
                    options={authorsOptions}
                    optionLabel="name"
                    placeholder="Select an Author"
                    appendTo={document.body}
                    className="w-full"
                    showClear
                />
            </div>
            <div className="field">
                <label htmlFor="country" className="font-bold">
                    Categories*
                </label>
                <MultiSelect value={selectedCategories} onChange={(e) => categoryChange(e.value)} filter options={categoryOptions} optionLabel="name" display="chip"
                    placeholder="Select Categories" maxSelectedLabels={3} className="w-full" />
            </div>

        </Dialog>
    );
};

export default AddEditVideo;
