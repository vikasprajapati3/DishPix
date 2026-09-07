
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
    return (
        <article className="w-full bg-white">

            {/* Post Header */}
            <div className="px-4 py-3 flex items-center justify-between">

                <div className="flex items-center gap-3">


                    {/* User Avatar */}
                    <div className="w-9 h-9 rounded-full border border-(--primary) overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                        <span className="font-bold text-neutral-500 uppercase text-sm">
                            {post.user?.charAt(0)}
                        </span>
                    </div>

                    {/* User + Restaurant */}
                    <div className="leading-tight">

                        <h3 className="font-semibold text-neutral-900 text-sm">
                            {post.user}
                        </h3>

                        <p className="text-xs text-neutral-500 mt-0.5">
                            {post.restaurant}

                        </p>

                    </div>

                </div>

                {/* more button */}
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
                    onDoubleClick={() => onLike?.(post.id)}
                />

            </div>

            {/* Post Content */}
            <div className="px-4 pt-3 pb-4">

                {/* Actions */}
                <div className="flex items-center gap-5 mb-2">

                    {/* Like */}
                    <button
                        onClick={() => onLike?.(post.id)}
                        className="flex items-center gap-1.5 select-none cursor-pointer"
                        aria-label={
                            post.hasLiked
                                ? "Unlike post"
                                : "Like post"
                        }
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`text-[21px] transition-all ${post.hasLiked
                                ? "text-rose-500 scale-110"
                                : "text-neutral-800"
                                }`}
                        />

                        <span
                            className={`text-sm font-semibold ${post.hasLiked
                                ? "text-rose-500"
                                : "text-neutral-800"
                                }`}
                        >
                            {post.likes}
                        </span>
                    </button>

                    {/* Comments */}
                    <button
                        onClick={() => onComments?.(post.id)}
                        className="flex items-center gap-1.5 text-neutral-800 select-none cursor-pointer"
                        aria-label="View comments"
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            className="text-[20px]"
                        />

                        <span className="text-sm font-semibold">
                            {post.comments}
                        </span>
                    </button>

                </div>

                {/* Caption */}
                {post.caption && (
                    <p className="text-sm text-neutral-800 leading-relaxed">

                        <span className="font-semibold text-neutral-900 mr-2">
                            {post.user}
                        </span>

                        {post.caption}

                    </p>
                )}

            </div>

        </article>
    );
}

