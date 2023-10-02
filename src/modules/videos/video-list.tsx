import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProcessedVideo } from '../../common/interfaces';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

type VideoListProps = {
    videos: ProcessedVideo[];
    deleteVideos: (data: ProcessedVideo[]) => void;
    addEditVideo: (isAdd: boolean, data?: ProcessedVideo) => void;
    onGlobalFilterChange: (data: string) => void;
    globalFilterValue: string;
};

export const VideoList = ({ videos, deleteVideos, addEditVideo, globalFilterValue, onGlobalFilterChange }: VideoListProps) => {

    const [selectedVideos, setSelectedVideos] = useState<ProcessedVideo[]>([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const categoryBodyTemplate = (rowData: ProcessedVideo) => {
        return (
            <div className="flex flex-wrap gap-2">
                {rowData.categories.map((category: string, index: number) => (
                    <Tag key={index} value={category} rounded></Tag>
                ))}
            </div>
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onGlobalFilterChange(e.target.value)}
                        placeholder="Search"
                    />
                </span>
                <div className="flex flex-wrap gap-2">
                    <Button label="New Video" size="small" icon="pi pi-plus" severity="success" onClick={() => addEditVideo(true)} />
                    <Button
                        label={`Delete video${selectedVideos.length > 1 ? 's' : ''}`}
                        size="small"
                        icon="pi pi-trash"
                        severity="danger"
                        disabled={!selectedVideos || !selectedVideos.length}
                        onClick={() => setShowDeleteDialog(true)}
                    />
                </div>
            </div>
        );
    };

    const header = renderHeader();
    const footer = `In total there are ${videos ? videos.length : 0} videos.`;

    const confirmDelete = () => {
        deleteVideos(selectedVideos);
        setSelectedVideos([]);
        setShowDeleteDialog(false);
    };

    const videoNameTemplate = (rowData: ProcessedVideo) => {
        return <Button className="p-button-link no-left-padding" onClick={() => addEditVideo(false, rowData)} label={rowData['name']} />;
    };

    const confirmDeleteMessage = (): string => {
        const videos = selectedVideos.map((video: ProcessedVideo) => video.name);
        return `Are you sure want to delete selected videos (${videos.length > 1 ? videos.join(', ') : videos})?`
    }

    return (
        <>
            <Card title="Manage videos">
                <DataTable
                    value={videos}
                    sortField="name"
                    sortOrder={1}
                    selectionMode={null}
                    selection={selectedVideos}
                    onSelectionChange={(e) => setSelectedVideos(e.value)}
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                    header={header}
                    footer={footer}
                    size="small">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column
                        field="name"
                        header="Video Name"
                        style={{ minWidth: '15rem' }}
                        body={videoNameTemplate}
                        bodyClassName="text-left"
                        sortable></Column>
                    <Column field="author.name" header="Author" sortable></Column>
                    <Column field="categories" header="Categories" body={categoryBodyTemplate}></Column>
                    <Column field="highestQualityFormat" header="Heighest quality format"></Column>
                    <Column field="releaseDate" header="Release date"></Column>
                </DataTable>
            </Card>
            <ConfirmDialog
                show={showDeleteDialog}
                message={confirmDeleteMessage()}
                closeClick={() => setShowDeleteDialog(false)}
                confirmClick={confirmDelete}
            />
        </>
    );
};
