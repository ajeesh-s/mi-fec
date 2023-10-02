import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/context";
import { Toast } from "primereact/toast";
import { Author, ProcessedVideo, Video } from "../../common/interfaces";
import { VideoList } from "./video-list";
import AddEditVideo from "./add-edit-video";
import { getVideo, getVideos, inserUpdateVideoByAuthor } from "../../services/videos";
import { getAuthors } from "../../services/authors";
import { debounce } from "../../utilities/utils";

const VideosConatiner: React.FC = () => {
    const { state } = useContext(AppContext);

    const toast = useRef<Toast | null>(null);
    const isAdd = useRef<boolean>(true);
    const authors = useRef<Author[]>([]);

    const [selectedVideo, setSelectedVideo] = useState<Video | null>(
        null
    );
    const [showAddEditDialog, setShowAddEditDialog] = useState<boolean>(false);

    const [processedVideos, setProcessedVideos] = useState<ProcessedVideo[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        const getProcessedVideos = async () => {
            authors.current = await getAuthors();
            updateProcessedVideoList();
        }
        getProcessedVideos();
    }, []);

    const updateProcessedVideoList = async (authorsList: Author[] = authors.current, searchText: string = "") => {
        if (!searchText) {
            setGlobalFilterValue(searchText);
        }
        setProcessedVideos(getVideos(state.categories, authorsList));
    }

    const confirmDeleteVideos = (videos: ProcessedVideo[]) => {
        videos.forEach(async (pVideo: ProcessedVideo) => {
            const authorDetails: Author = authors.current.find((author: Author) => author.id === pVideo.author.id) as Author;
            authorDetails.videos = authorDetails.videos.filter((item: Video) => item.id !== pVideo.id);
            await inserUpdateVideoByAuthor(authorDetails);
        });
        updateProcessedVideoList();
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Selected videos(s) deleted successfully",
            life: 3000,
        });
    };

    const addEditVideoOnClick = async (
        isAddaAction: boolean,
        processedVideo: ProcessedVideo | null = null
    ) => {
        if (processedVideo) {
            const video = await getVideo(processedVideo.author.id, processedVideo.id)

            setSelectedVideo({ ...video, authorId: processedVideo.author.id });
        }

        isAdd.current = isAddaAction;
        setShowAddEditDialog(true);
    };

    const getUpdatedAuthor = (data: Video) => {
        let { authorId, ...videoObj } = data;
        const authorDetails: Author = authors.current.find((author: Author) => author.id === authorId) as Author;
        if (isAdd.current) {
            const maxId = processedVideos.length ? Math.max(...processedVideos.map((video) => video.id)) : 0;
            debugger
            videoObj = { ...videoObj, id: maxId + 1 }
            authorDetails.videos.push(videoObj);
        } else {
            authorDetails.videos = authorDetails.videos.map((video: Video) => {
                if (video.id === videoObj.id) {
                    return { ...video, ...videoObj };
                }
                return video;
            });
        }
        return authorDetails;
    }


    const saveVideo = async (video: Video) => {
        setShowAddEditDialog(false);
        setSelectedVideo(null);
        await inserUpdateVideoByAuthor(getUpdatedAuthor(video));
        updateProcessedVideoList();
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: `Video ${isAdd.current ? "added" : "updated"} successfully`,
            life: 2000,
        });
    };

    const debouncedGlobalFilterChange = debounce(async (text: string) => {

        await updateProcessedVideoList(await getAuthors(text), text);
    }, 1000); // Adjust the debounce delay (in milliseconds) as needed

    const handleGlobalFilterChange = (text: string) => {
        setGlobalFilterValue(text);
        debouncedGlobalFilterChange(text);
    };

    return (
        <div>
            <Toast ref={toast} position="bottom-right" />
            <VideoList
                globalFilterValue={globalFilterValue}
                videos={processedVideos}
                deleteVideos={confirmDeleteVideos}
                addEditVideo={addEditVideoOnClick}
                onGlobalFilterChange={handleGlobalFilterChange}
            />{
                showAddEditDialog && <AddEditVideo
                    authors={authors.current}
                    isAdd={isAdd.current}
                    show={showAddEditDialog}
                    closeClick={() => setShowAddEditDialog(false)}
                    video={selectedVideo}
                    saveVideo={saveVideo}
                />
            }

        </div>
    );
};

export default VideosConatiner;
