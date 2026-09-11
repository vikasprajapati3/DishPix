import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faComment,
} from "@fortawesome/free-solid-svg-icons";

export default function PostCard({
    post,
    onLike,
    onComments,
}) {
    const username = post.userId?.username || "Unknown User";

    return (
        <article className="w-full bg-white">

            {/* Post Header */}
            <div className="px-3 py-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    {/* User Avatar */}
                    <div className="w-9 h-9 rounded-full border border-(--primary) overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-neutral-500 uppercase text-sm">
                            {username.charAt(0)}
                        </span>
                    </div>

                    {/* Username + Restaurant */}
                    <div className="leading-tight">

                        <h3 className="font-semibold text-neutral-900 text-sm">
                            {username}
                        </h3>

                        <p className="text-xs text-rose-500 mt-0.5">
                            @{post.restaurant}
                            {post.location && ` (${post.location})`}
                        </p>

                    </div>

                </div>

                {/* More button */}
                <button
                    className="text-neutral-700 text-xl leading-none px-1"
                    aria-label="More options"
                >
                    •••
                </button>

            </div>

            {/* Post Image */}
            <div className="w-full bg-neutral-100">
                <img
                    src={post.image}
                    alt={post.caption || "Shared dish"}
                    className="block w-full h-auto object-cover"
                    onDoubleClick={() => onLike?.(post._id)}
                />
            </div>

            {/* Post Content */}
            <div className="px-3 pt-3 pb-3">

                {/* Actions */}
                <div className="flex items-center gap-5 mb-2">

                    {/* Like */}
                    <button
                        onClick={() => onLike?.(post._id)}
                        className="flex items-center gap-1.5 select-none cursor-pointer"
                        aria-label="Like post"
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="text-[21px] text-neutral-800"
                        />

                        <span className="text-sm font-semibold text-neutral-800">
                            {post.likesCount}
                        </span>
                    </button>

                    {/* Comments */}
                    <button
                        onClick={() => onComments?.(post._id)}
                        className="flex items-center gap-1.5 text-neutral-800 select-none cursor-pointer"
                        aria-label="View comments"
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            className="text-[20px]"
                        />

                        <span className="text-sm font-semibold">
                            {post.commentsCount}
                        </span>
                    </button>

                </div>

                {/* Caption */}
                {post.caption && (
                    <p className="text-sm text-neutral-800 leading-relaxed">
                        <span className="font-semibold text-neutral-900 mr-2">
                            {username}
                        </span>

                        {post.caption}
                    </p>
                )}

            </div>

        </article>
    );
}
