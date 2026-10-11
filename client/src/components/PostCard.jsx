import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faComment,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function PostCard({
    post,
    onLike,
    onComments,
}) {
    const username = post.userId?.username || "Unknown User";
    const imageUrl = typeof post.image === "string"
        ? post.image
        : post.image?.url;

    const rating = Number(post.rating) || 0;

    return (
        <article className="w-full bg-white  shadow-xs border border-neutral-100 overflow-hidden mb-4">

            {/* Post Header */}
            <div className="px-3.5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full border-2 border-rose-500 overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-neutral-700 uppercase text-sm">
                            {username.charAt(0)}
                        </span>
                    </div>

                    {/* Username + Restaurant */}
                    <div className="leading-tight">
                        <h3 className="font-bold text-neutral-900 text-sm">
                            {username}
                        </h3>
                        {post.restaurant && (
                            <p className="text-xs font-bold text-neutral-500 mt-0.5 flex items-center gap-1">

                                @{post.restaurant} <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" /> {post.location && ` ${post.location}`}
                            </p>
                        )}
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

            {/* Post Image (Natural sizing to prevent over-cropping) */}
            {imageUrl ? (
                <div className="w-full bg-neutral-100 relative group">
                    <img
                        src={imageUrl}
                        alt={post.foodName || post.caption || "Shared dish"}
                        className="w-full h-auto max-h-137.5 object-cover"
                        onDoubleClick={() => onLike?.(post._id)}
                    />

                    {/* Modern Rating Pill Badge */}
                    {rating > 0 && (
                        <div className="absolute top-3 right-3 bg-neutral-900/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                            <span className="text-amber-400">★</span>
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-48 bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-500">
                    No image available
                </div>
            )}

            {/* Post Content */}
            <div className="px-3.5 pt-3 pb-4">

                {/* Single Row: Food Name / Heading + Actions */}
                <div className="flex items-center justify-between mb-2 gap-2">

                    {/* Left: Food Name */}
                    {post.foodName ? (
                        <h3 className="font-bold text-neutral-900 text-base leading-tight">
                            {post.foodName}
                        </h3>
                    ) : (
                        <div />
                    )}

                    {/* Right: Like & Comment Actions */}
                    <div className="flex items-center gap-5 shrink-0">
                        {/* Like */}
                        <button
                            onClick={() => onLike?.(post._id)}
                            className="flex items-center gap-1.5 select-none cursor-pointer group"
                            aria-label="Like post"
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="text-[21px] text-neutral-800 group-hover:text-rose-500 transition-colors"
                            />
                            <span className="text-sm font-bold text-neutral-800">
                                {post.likesCount ?? 0}
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
                            <span className="text-sm font-bold">
                                {post.commentsCount ?? 0}
                            </span>
                        </button>
                    </div>

                </div>

                {/* Caption */}
                {post.caption && (
                    <p className="text-sm text-neutral-800 leading-relaxed mt-2">
                        <span className="font-bold text-neutral-900 mr-2">
                            {username}
                        </span>
                        {post.caption}
                    </p>
                )}

            </div>

        </article>
    );
}