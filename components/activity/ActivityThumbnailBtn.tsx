"use client";

import { loadActivityThumbnailUrl } from "@/utils/loadBucket/loadBucketUrls";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";




const ActivityThumbnailBtn = ({activityInfo} : any) => {
    const router = useRouter();
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    const handleActivityClick = () => {
        router.push(`/activities/${activityInfo.id}`);
    };

    const fetchThumbnail = async () => {
        const url = await loadActivityThumbnailUrl(activityInfo.thumbnail)
        console.log(url)
        setThumbnailUrl(url);
    }

    useEffect(() => {
        fetchThumbnail()
    }, [])

    return (
        <div className="m-4 ">
            {thumbnailUrl && (
                <div className="rounded-lg">
                    <div
                        className="bg-cover bg-center cursor-pointer h-60 w-60 rounded-lg bg-blend-darken bg-black/15 hover:bg-black/0"
                        style={{ backgroundImage: `url('${thumbnailUrl}')` }}
                        onClick={handleActivityClick}
                    >
                    </div>
                    {/* <div className="backdrop-blur-sm bg-white/30">{activityInfo?.name}</div> */}
                </div>
            )}
        </div>
    );
};

export default ActivityThumbnailBtn;
